import type { LinkProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { captureAnalyticsEvent } from "@/analytics/client";

const projects = {
  matic: "Matic",
  legends: "Legends Global",
  clinicalhours: "ClinicalHours",
} as const;

type CaseLinkProps = LinkProps & {
  projectId: keyof typeof projects;
};

export function CaseLink({ projectId, onClick, ...props }: CaseLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          captureAnalyticsEvent("project_opened", {
            project_id: projectId,
            project_name: projects[projectId],
          });
        }
      }}
    />
  );
}
