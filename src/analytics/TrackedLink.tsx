import type { ComponentPropsWithoutRef } from "react";
import { captureAnalyticsEvent } from "./client";
import type { AnalyticsEventName, AnalyticsEventProperties } from "./events";

type EventTracking = {
  [EventName in AnalyticsEventName]: {
    eventName: EventName;
    properties: AnalyticsEventProperties[EventName];
  };
}[AnalyticsEventName];

type TrackedLinkProps = ComponentPropsWithoutRef<"a"> & {
  tracking: EventTracking;
};

export function TrackedLink({ onClick, tracking, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          captureAnalyticsEvent(tracking.eventName, tracking.properties);
        }
      }}
    />
  );
}
