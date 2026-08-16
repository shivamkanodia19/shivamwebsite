import { useEffect } from "react";
import { captureAnalyticsEvent } from "./client";

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

function readSectionState(sectionId: string): SectionSessionState {
  const fallback = { activeMilliseconds: 0, reportedMilestones: [], viewed: false };
  try {
    const value = window.sessionStorage.getItem(`${sectionStateStoragePrefix}${sectionId}`);
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

function writeSectionState(sectionId: string, state: SectionSessionState) {
  try {
    window.sessionStorage.setItem(`${sectionStateStoragePrefix}${sectionId}`, JSON.stringify(state));
  } catch {
    // Analytics state is best effort and must never disrupt the public experience.
  }
}

export function useSectionTracking(sectionDefinitions: readonly SectionDefinition[]) {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const sectionStates = new Map(sectionDefinitions.map(({ id }) => [id, readSectionState(id)]));
    const visibleSectionIds = new Set<string>();
    const definitionsById = new Map(sectionDefinitions.map((definition) => [definition.id, definition]));

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const sectionId = (entry.target as HTMLElement).id;
        const definition = definitionsById.get(sectionId);

        if (!definition) {
          continue;
        }

        const isVisible = entry.isIntersecting && entry.intersectionRatio >= visibilityThreshold;
        if (isVisible) {
          visibleSectionIds.add(sectionId);
          const state = sectionStates.get(sectionId);
          if (state && !state.viewed) {
            state.viewed = true;
            writeSectionState(sectionId, state);
            captureAnalyticsEvent("section_viewed", {
              section_id: definition.id,
              section_label: definition.label,
              visibility_threshold: visibilityThreshold,
            });
          }
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
        writeSectionState(sectionId, state);
      }
    }, 1_000);

    return () => {
      window.clearInterval(interval);
      observer.disconnect();
    };
  }, [sectionDefinitions]);
}
