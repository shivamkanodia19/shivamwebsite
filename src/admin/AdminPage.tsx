import { useEffect, useRef, useState } from "react";
import { AdminDashboard, AdminDashboardSkeleton } from "./AdminDashboard";
import { AdminLogin } from "./AdminLogin";
import { AdminApiError, clearSessionToken, fetchAnalytics, getSessionToken, login } from "./api";
import type { AdminAnalyticsResponse, RangeDays } from "./types";
import "./admin.css";

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
  const [range, setRange] = useState<RangeDays>(7);
  const [refreshing, setRefreshing] = useState(false);
  const [staleMessage, setStaleMessage] = useState<string | null>(null);
  const reportRequestId = useRef(0);
  const refreshingRef = useRef(false);

  useEffect(() => {
    if (!token) return;
    let active = true;
    void fetchAnalytics(7, token)
      .then((response) => {
        if (!active) return;
        setReport(response);
        setRange(response.rangeDays);
        setError(null);
        setStaleMessage(null);
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
    reportRequestId.current += 1;
    clearSessionToken();
    setToken(null);
    setReport(null);
    setError(null);
    setRange(7);
    setRefreshing(false);
    refreshingRef.current = false;
    setStaleMessage(null);
    setAccessState("login");
  }

  async function updateReport(nextRange: RangeDays) {
    if (!token || refreshingRef.current) return;
    refreshingRef.current = true;
    const requestId = ++reportRequestId.current;
    setRefreshing(true);
    setStaleMessage(null);
    try {
      const response = await fetchAnalytics(nextRange, token);
      if (requestId !== reportRequestId.current) return;
      setReport(response);
      setRange(response.rangeDays);
      setError(null);
      setAccessState("ready");
    } catch (caughtError) {
      if (requestId !== reportRequestId.current) return;
      if (isExpiredSession(caughtError)) {
        clearSessionToken();
        setToken(null);
        setReport(null);
        setAccessState("login");
        setError(errorMessage(caughtError));
      } else if (report) {
        setStaleMessage(errorMessage(caughtError));
        setAccessState("ready");
      } else {
        setError(errorMessage(caughtError));
        setAccessState("error");
      }
    } finally {
      if (requestId === reportRequestId.current) {
        refreshingRef.current = false;
        setRefreshing(false);
      }
    }
  }

  if (accessState === "login") {
    return <AdminLogin error={error} pending={false} onSubmit={handleLogin} />;
  }

  if (accessState === "loading") {
    return <AdminDashboardSkeleton />;
  }

  if (accessState === "error") {
    return (
      <main className="admin-access-error">
        <p className="admin-eyebrow">ANALYTICS / PRIVATE</p>
        <h1>Private analytics unavailable</h1>
        <p role="alert">{error}</p>
        <button onClick={handleLogout} type="button">
          Log out
        </button>
      </main>
    );
  }

  if (!report) return <AdminDashboardSkeleton />;

  return <AdminDashboard
    onLogout={handleLogout}
    onRangeChange={updateReport}
    onRefresh={() => updateReport(range)}
    range={range}
    refreshing={refreshing}
    report={report}
    staleMessage={staleMessage}
  />;
}
