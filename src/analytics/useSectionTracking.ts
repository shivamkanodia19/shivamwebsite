import { useEffect } from "react";
import { captureAnalyticsEvent, getAnalyticsSessionId } from "./client";

export type SectionDefinition = {
  id: string;
  label: string;
};

const visibilityThreshold = 0.5;
const engagementMilestones = [10_000, 30_000, 60_000] as const;
const sectionStateStoragePrefix = "analytics-section-state:";

type SectionSessionState = {
  activeMilliseconds: number;
  reportedMilestones: number[];
  viewed: boolean;
};

function emptySectionState(): SectionSessionState {
  return { activeMilliseconds: 0, reportedMilestones: [], viewed: false };
}

function sectionStateKey(sectionId: string, sessionId: string) {
  return `${sectionStateStoragePrefix}${sessionId}:${sectionId}`;
}

function readSectionState(sectionId: string, sessionId: string): SectionSessionState {
  const fallback = emptySectionState();
  try {
    const value = window.sessionStorage.getItem(sectionStateKey(sectionId, sessionId));
    if (!value) return fallback;
    const parsed = JSON.parse(value) as Partial<SectionSessionState>;
    if (
      !Number.isSafeInteger(parsed.activeMilliseconds) ||
      (parsed.activeMilliseconds ?? -1) < 0 ||
      typeof parsed.viewed !== "boolean" ||
      !Array.isArray(parsed.reportedMilestones) ||
      parsed.reportedMilestones.some((milestone) => !(engagementMilestones as readonly number[]).includes(milestone))
    ) {
      return fallback;
    }
    return parsed as SectionSessionState;
  } catch {
    return fallback;
  }
}

function writeSectionState(sectionId: string, sessionId: string, state: SectionSessionState) {
  try {
    window.sessionStorage.setItem(sectionStateKey(sectionId, sessionId), JSON.stringify(state));
  } catch {
    // Analytics state is best effort and must never disrupt the public experience.
  }
}

export function useSectionTracking(sectionDefinitions: readonly SectionDefinition[]) {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    let activeSessionId = getAnalyticsSessionId();
    const sectionStates = new Map(
      sectionDefinitions.map(({ id }) => [
        id,
        activeSessionId ? readSectionState(id, activeSessionId) : emptySectionState(),
      ]),
    );
    const visibleSectionIds = new Set<string>();
    const definitionsById = new Map(sectionDefinitions.map((definition) => [definition.id, definition]));

    const persist = (sectionId: string, state: SectionSessionState) => {
      if (activeSessionId) {
        writeSectionState(sectionId, activeSessionId, state);
      }
    };

    const markVisibleSectionViewed = (sectionId: string, definition: SectionDefinition) => {
      const state = sectionStates.get(sectionId);
      if (!state || state.viewed) {
        return;
      }

      state.viewed = true;
      persist(sectionId, state);
      captureAnalyticsEvent("section_viewed", {
        section_id: definition.id,
        section_label: definition.label,
        visibility_threshold: visibilityThreshold,
      });
    };

    const adoptOrResetSession = (nextSessionId: string) => {
      const previousSessionId = activeSessionId;
      activeSessionId = nextSessionId;

      if (previousSessionId === null) {
        for (const [sectionId, state] of sectionStates) {
          writeSectionState(sectionId, nextSessionId, state);
        }
        return;
      }

      for (const definition of sectionDefinitions) {
        const nextState = readSectionState(definition.id, nextSessionId);
        sectionStates.set(definition.id, nextState);
        if (visibleSectionIds.has(definition.id)) {
          markVisibleSectionViewed(definition.id, definition);
        }
      }
    };

    const syncSession = () => {
      const nextSessionId = getAnalyticsSessionId();
      if (!nextSessionId || nextSessionId === activeSessionId) {
        return;
      }

      adoptOrResetSession(nextSessionId);
    };

    const observer = new IntersectionObserver((entries) => {
      syncSession();
      for (const entry of entries) {
        const sectionId = (entry.target as HTMLElement).id;
        const definition = definitionsById.get(sectionId);

        if (!definition) {
          continue;
        }

        const isVisible = entry.isIntersecting && entry.intersectionRatio >= visibilityThreshold;
        if (isVisible) {
          visibleSectionIds.add(sectionId);
          markVisibleSectionViewed(sectionId, definition);
        } else {
          visibleSectionIds.delete(sectionId);
        }
      }
    }, { threshold: visibilityThreshold });

    for (const definition of sectionDefinitions) {
      const section = document.getElementById(definition.id);
      if (section) {
        observer.observe(section);
      }
    }

    const interval = window.setInterval(() => {
      if (document.visibilityState !== "visible") {
        return;
      }

      syncSession();

      for (const sectionId of visibleSectionIds) {
        const state = sectionStates.get(sectionId);
        if (!state) continue;
        state.activeMilliseconds += 1_000;

        for (const [index, milestone] of engagementMilestones.entries()) {
          if (state.activeMilliseconds >= milestone && !state.reportedMilestones.includes(milestone)) {
            state.reportedMilestones.push(milestone);
            captureAnalyticsEvent("section_engaged", {
              section_id: sectionId,
              active_milliseconds: milestone - (engagementMilestones[index - 1] ?? 0),
            });
          }
        }
        persist(sectionId, state);
      }
    }, 1_000);

    return () => {
      window.clearInterval(interval);
      observer.disconnect();
    };
  }, [sectionDefinitions]);
}
