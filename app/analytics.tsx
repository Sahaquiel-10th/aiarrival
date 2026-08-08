"use client";

import { useEffect } from "react";

const TRACKING_ENDPOINT = "/api/analytics";
const VISITOR_COOKIE = "jl_visitor_id";

function randomId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

function getVisitorId() {
  const existing = readCookie(VISITOR_COOKIE) || localStorage.getItem(VISITOR_COOKIE);
  if (existing) return existing;
  const id = randomId();
  localStorage.setItem(VISITOR_COOKIE, id);
  document.cookie = `${VISITOR_COOKIE}=${encodeURIComponent(id)}; Max-Age=31536000; Path=/; Domain=.aiarrival.cn; SameSite=Lax; Secure`;
  return id;
}

function getSessionId() {
  const key = "jl_session_id";
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;
  const id = randomId();
  sessionStorage.setItem(key, id);
  return id;
}

function audienceFor(pathname: string) {
  if (pathname.startsWith("/expert-ai-twin")) return "expert";
  if (pathname.startsWith("/knowledge-assets")) return "founder";
  if (pathname.startsWith("/diagnosis")) return new URLSearchParams(location.search).get("audience") || "diagnosis";
  return "official";
}

export default function Analytics() {
  useEffect(() => {
    if (location.pathname.startsWith("/data-center")) return;

    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    const startedAt = Date.now();
    let exitSent = false;
    const params = new URLSearchParams(location.search);

    const send = (eventType: string, extra: Record<string, unknown> = {}) => {
      const payload = {
        visitorId,
        sessionId,
        eventType,
        pathname: location.pathname,
        title: document.title,
        referrer: document.referrer,
        source: params.get("utm_source") || "",
        campaign: params.get("utm_campaign") || "",
        content: params.get("utm_content") || "",
        audience: audienceFor(location.pathname),
        device: window.innerWidth < 768 ? "mobile" : window.innerWidth < 1100 ? "tablet" : "desktop",
        ...extra,
      };
      fetch(TRACKING_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
        credentials: "omit",
      }).catch(() => undefined);
    };

    send("page_view");

    const handleClick = (event: MouseEvent) => {
      const element = (event.target as HTMLElement | null)?.closest("a, button, [data-track]") as HTMLElement | null;
      if (!element) return;
      const label = (element.getAttribute("data-track") || element.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120);
      const target = element instanceof HTMLAnchorElement ? element.href : element.getAttribute("data-track-target") || "";
      send("click", { label, target: target.slice(0, 500) });
    };

    const sendExit = () => {
      if (exitSent) return;
      exitSent = true;
      send("page_exit", { durationMs: Math.max(0, Date.now() - startedAt) });
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") sendExit();
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", sendExit);
    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", sendExit);
      sendExit();
    };
  }, []);

  return null;
}
