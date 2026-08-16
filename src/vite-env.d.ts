/// <reference types="vite/client" />

interface Window {
  __analyticsTestCapturedPayloads?: Array<Record<string, unknown>>;
  __analyticsTestPostHog?: {
    capture: (event: string, properties: Record<string, unknown>) => void;
    startSessionRecording: () => void;
  };
}
