import { useEffect } from "react";
import { captureAnalyticsEvent } from "./client";

export type SectionDefinition = {
  id: string;
  label: string;
};

const visibilityThreshold = 0.5;
const engagementMilestones = [10_000, 30_000, 60_000] as const;

export function useSectionTracking(sectionDefinitions: readonly SectionDefinition[]) {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const activeMilliseconds = new Map(sectionDefinitions.map(({ id }) => [id, 0]));
    const visibleSectionIds = new Set<string>();
    const viewedSectionIds = new Set<string>();
    const reportedMilestones = new Map(sectionDefinitions.map(({ id }) => [id, new Set<number>()]));
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
          if (!viewedSectionIds.has(sectionId)) {
            viewedSectionIds.add(sectionId);
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
        const currentActiveMilliseconds = (activeMilliseconds.get(sectionId) ?? 0) + 1_000;
        activeMilliseconds.set(sectionId, currentActiveMilliseconds);
        const sectionMilestones = reportedMilestones.get(sectionId);

        for (const milestone of engagementMilestones) {
          if (currentActiveMilliseconds >= milestone && !sectionMilestones?.has(milestone)) {
            sectionMilestones?.add(milestone);
            captureAnalyticsEvent("section_engaged", {
              section_id: sectionId,
              active_milliseconds: milestone,
            });
          }
        }
      }
    }, 1_000);

    return () => {
      window.clearInterval(interval);
      observer.disconnect();
    };
  }, [sectionDefinitions]);
}
