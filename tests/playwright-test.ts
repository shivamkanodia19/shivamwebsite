import { expect, test as base } from "@playwright/test";

export type BlockedPostHogRequest = {
  url: string;
  method: string;
  headers: Record<string, string>;
  postData: string | null;
  aborted: boolean;
};

type QaFixtures = {
  posthogRequests: BlockedPostHogRequest[];
};

export const test = base.extend<QaFixtures>({
  posthogRequests: [async ({ context }, use) => {
    const requests: BlockedPostHogRequest[] = [];
    await context.route(/^https:\/\/posthog\.invalid\//, async (route) => {
      const request = route.request();
      const captured: BlockedPostHogRequest = {
        url: request.url(),
        method: request.method(),
        headers: request.headers(),
        postData: request.postData(),
        aborted: false,
      };
      requests.push(captured);
      await route.abort("blockedbyclient");
      captured.aborted = true;
    });
    await use(requests);
  }, { auto: true }],
});

export { expect };
