export type AnalyticsEventProperties = {
  section_viewed: {
    section_id: string;
    section_label: string;
    visibility_threshold: number;
  };
  section_engaged: { section_id: string; active_milliseconds: number };
  element_clicked: {
    element_id: string;
    label: string;
    section_id: string;
    destination_type: string;
  };
  project_opened: { project_id: string; project_name: string };
  resume_viewed: { placement: string };
  external_link_clicked: { destination_type: string };
  pitch_opened: Record<string, never>;
  contact_clicked: { channel: "email" | "linkedin" };
};

export type AnalyticsEventName = keyof AnalyticsEventProperties;
