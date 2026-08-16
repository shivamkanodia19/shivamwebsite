import { useEffect, useState } from "react";
import { AdminLogin } from "./AdminLogin";
import { AdminApiError, clearSessionToken, fetchAnalytics, getSessionToken, login } from "./api";
import type { AdminAnalyticsResponse } from "./types";

type AccessState = "login" | "loading" | "ready" | "error";

function errorMessage(error: unknown) {
  return error instanceof AdminApiError
    ? error.message
    : "Analytics access is temporarily unavailable. Please try again.";
}

function isExpiredSession(error: unknown) {
  return error instanceof AdminApiError && error.code === "unauthorized";
}

export function AdminPage() {
  const [token, setToken] = useState(getSessionToken);
  const [accessState, setAccessState] = useState<AccessState>(() => (getSessionToken() ? "loading" : "login"));
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AdminAnalyticsResponse | null>(null);

  useEffect(() => {
    if (!token) return;
    let active = true;
    void fetchAnalytics(7, token)
      .then((response) => {
        if (!active) return;
        setReport(response);
        setError(null);
        setAccessState("ready");
      })
      .catch((caughtError: unknown) => {
        if (!active) return;
        if (isExpiredSession(caughtError)) {
          clearSessionToken();
          setToken(null);
          setAccessState("login");
        } else {
          setAccessState("error");
        }
        setError(errorMessage(caughtError));
      });
    return () => {
      active = false;
    };
  }, [token]);

  async function handleLogin(password: string) {
    setAccessState("loading");
    setError(null);
    try {
      const nextToken = await login(password);
      setToken(nextToken);
    } catch (caughtError) {
      if (isExpiredSession(caughtError)) clearSessionToken();
      setAccessState("login");
      setError(errorMessage(caughtError));
    }
  }

  function handleLogout() {
    clearSessionToken();
    setToken(null);
    setReport(null);
    setError(null);
    setAccessState("login");
  }

  if (accessState === "login") {
    return <AdminLogin error={error} pending={false} onSubmit={handleLogin} />;
  }

  if (accessState === "loading") {
    return <main className="mx-auto flex min-h-screen max-w-md items-center px-6 py-12" aria-live="polite">Checking private access…</main>;
  }

  if (accessState === "error") {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <h1 className="font-serif text-4xl text-[#0D0D0D]">Private analytics</h1>
        <p role="alert" className="mt-4 text-sm text-[#8E2F2F]">{error}</p>
        <button className="mt-6 min-h-11 self-start bg-[#1747A6] px-4 py-2 font-mono text-sm text-white" onClick={handleLogout} type="button">
          Log out
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <p className="font-mono text-xs tracking-[0.16em] text-[#555]">ANALYTICS / PRIVATE</p>
      <h1 className="mt-3 font-serif text-4xl text-[#0D0D0D]">Analytics access verified</h1>
      <p className="mt-3 text-sm leading-6 text-[#555]">Your protected report is ready for the dashboard.</p>
      <time className="mt-2 font-mono text-xs text-[#555]" dateTime={report?.generatedAt}>
        Report checked {report?.generatedAt}
      </time>
      <button className="mt-8 min-h-11 self-start bg-[#1747A6] px-4 py-2 font-mono text-sm text-white" onClick={handleLogout} type="button">
        Log out
      </button>
    </main>
  );
}
