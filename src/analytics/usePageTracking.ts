import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  captureAnalyticsEvent,
  initializeAnalytics,
  isTrackablePageviewPath,
  syncAnalyticsRoute,
} from "./client";

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    initializeAnalytics();
  }, []);

  useEffect(() => {
    syncAnalyticsRoute(location.pathname);
    if (isTrackablePageviewPath(location.pathname)) {
      captureAnalyticsEvent("$pageview", {});
    }
  }, [location.pathname]);
}
