/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB?: D1Database;
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_PASSWORD_HASH?: string;
  ADMIN_PASSWORD_SALT?: string;
  ADMIN_SESSION_SECRET?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

const leadOrigins = new Set([
  "https://aiarrival.cn",
  "https://www.aiarrival.cn",
  "https://ai-knowledge-assets-2026.sahaquile.chatgpt.site",
  "https://agent.aiarrival.cn",
]);

const ADMIN_COOKIE = "jl_admin_session";
const ADMIN_CONFIG_FILE = "/opt/aiarrival-website/shared/admin-auth.json";
const SERVER_ANALYTICS_FILE = "/opt/aiarrival-website/shared/analytics.ndjson";

type AdminConfig = {
  username: string;
  password?: string;
  passwordHash?: string;
  passwordSalt?: string;
  sessionSecret: string;
};

type AnalyticsEvent = {
  id: string;
  createdAt: string;
  visitorId: string;
  sessionId: string;
  eventType: string;
  pathname: string;
  title: string;
  referrer: string;
  source: string;
  campaign: string;
  content: string;
  audience: string;
  device: string;
  label: string;
  target: string;
  durationMs: number;
};

function leadCorsHeaders(request: Request) {
  const origin = request.headers.get("origin") ?? "";
  const allowed =
    leadOrigins.has(origin) ||
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:");

  return {
    "Access-Control-Allow-Origin": allowed ? origin : "https://www.aiarrival.cn",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function leadJson(request: Request, body: unknown, init: ResponseInit = {}) {
  return Response.json(body, {
    ...init,
    headers: { ...leadCorsHeaders(request), ...init.headers },
  });
}

async function createLead(request: Request, db: D1Database) {
  const payload = (await request.json()) as {
    audience?: string;
    name?: string;
    contact?: string;
    identity?: string;
    primaryGoal?: string;
    currentStorage?: string;
    teamNeed?: string;
    sourceUrl?: string;
    consent?: boolean;
  };
  const required = [payload.contact, payload.identity, payload.primaryGoal, payload.currentStorage, payload.teamNeed];
  if (required.some((value) => !value?.trim()) || payload.consent !== true) {
    return leadJson(request, { error: "请完成快速诊断并同意我们联系你。" }, { status: 400 });
  }

  const id = crypto.randomUUID();
  await db.prepare(`
    INSERT INTO lead_requests (
      id, audience, name, contact, identity, primary_goal,
      current_storage, team_need, source_url, consent_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id,
    payload.audience === "expert" ? "expert" : "founder",
    payload.name?.trim() ?? "",
    payload.contact!.trim(),
    payload.identity!.trim(),
    payload.primaryGoal!.trim(),
    payload.currentStorage!.trim(),
    payload.teamNeed!.trim(),
    payload.sourceUrl?.slice(0, 500) ?? "",
    new Date().toISOString(),
  ).run();

  return leadJson(request, { id, saved: true }, { status: 201 });
}

async function completeLead(request: Request, db: D1Database, id: string) {
  const payload = (await request.json()) as {
    answers?: unknown;
    result?: { label?: string; maturity?: string; service?: string };
  };
  if (!id || !payload.answers || !payload.result) {
    return leadJson(request, { error: "诊断内容不完整。" }, { status: 400 });
  }

  await db.prepare(`
    UPDATE lead_requests
    SET status = 'complete', updated_at = CURRENT_TIMESTAMP,
        deep_answers = ?, result_label = ?, result_maturity = ?, result_service = ?
    WHERE id = ?
  `).bind(
    JSON.stringify(payload.answers).slice(0, 30000),
    payload.result.label?.slice(0, 100) ?? "",
    payload.result.maturity?.slice(0, 100) ?? "",
    payload.result.service?.slice(0, 160) ?? "",
    id,
  ).run();

  return leadJson(request, { saved: true });
}

async function ensureServerLeadFile() {
  const { mkdir, open } = await import("node:fs/promises");
  const directory = "/opt/aiarrival-website/shared";
  const file = `${directory}/leads.ndjson`;
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const handle = await open(file, "a", 0o600);
  await handle.close();
  return file;
}

async function appendServerLead(event: Record<string, unknown>) {
  const { appendFile } = await import("node:fs/promises");
  const file = await ensureServerLeadFile();
  await appendFile(file, `${JSON.stringify(event)}\n`, { encoding: "utf8", mode: 0o600 });
}

async function handleServerLeadRequest(request: Request, pathname: string) {
  if (pathname === "/api/leads/health" && request.method === "GET") {
    await ensureServerLeadFile();
    return leadJson(request, { storage: "ready", provider: "primary-server" });
  }

  if (pathname === "/api/leads" && request.method === "POST") {
    const payload = (await request.json()) as {
      audience?: string;
      name?: string;
      contact?: string;
      identity?: string;
      primaryGoal?: string;
      currentStorage?: string;
      teamNeed?: string;
      sourceUrl?: string;
      consent?: boolean;
    };
    const required = [payload.contact, payload.identity, payload.primaryGoal, payload.currentStorage, payload.teamNeed];
    if (required.some((value) => !value?.trim()) || payload.consent !== true) {
      return leadJson(request, { error: "请完成快速诊断并同意我们联系你。" }, { status: 400 });
    }
    const id = crypto.randomUUID();
    await appendServerLead({
      event: "quick",
      id,
      createdAt: new Date().toISOString(),
      audience: payload.audience === "expert" ? "expert" : "founder",
      name: payload.name?.trim() ?? "",
      contact: payload.contact!.trim(),
      identity: payload.identity!.trim(),
      primaryGoal: payload.primaryGoal!.trim(),
      currentStorage: payload.currentStorage!.trim(),
      teamNeed: payload.teamNeed!.trim(),
      sourceUrl: payload.sourceUrl?.slice(0, 500) ?? "",
      consent: true,
    });
    return leadJson(request, { id, saved: true }, { status: 201 });
  }

  if (pathname.startsWith("/api/leads/") && request.method === "PATCH") {
    const id = decodeURIComponent(pathname.slice("/api/leads/".length));
    const payload = (await request.json()) as {
      answers?: unknown;
      result?: { label?: string; maturity?: string; service?: string };
    };
    if (!id || !payload.answers || !payload.result) {
      return leadJson(request, { error: "诊断内容不完整。" }, { status: 400 });
    }
    await appendServerLead({
      event: "complete",
      id,
      completedAt: new Date().toISOString(),
      answers: payload.answers,
      result: payload.result,
    });
    return leadJson(request, { saved: true });
  }

  return leadJson(request, { error: "Method not allowed" }, { status: 405 });
}

async function handleLeadRequest(request: Request, env: Env | undefined, pathname: string) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: leadCorsHeaders(request) });
  }
  if (!env?.DB) {
    try {
      return await handleServerLeadRequest(request, pathname);
    } catch (error) {
      console.error("Primary server lead storage failed", error);
      return leadJson(request, { error: "线索存储暂未就绪，请稍后重试。" }, { status: 503 });
    }
  }

  try {
    if (pathname === "/api/leads/health" && request.method === "GET") {
      await env.DB.prepare("SELECT 1 FROM lead_requests LIMIT 1").first();
      return leadJson(request, { storage: "ready" });
    }
    if (pathname === "/api/leads" && request.method === "POST") {
      return await createLead(request, env.DB);
    }
    if (pathname.startsWith("/api/leads/") && request.method === "PATCH") {
      return await completeLead(request, env.DB, decodeURIComponent(pathname.slice("/api/leads/".length)));
    }
    return leadJson(request, { error: "Method not allowed" }, { status: 405 });
  } catch (error) {
    console.error("Lead persistence failed", error);
    return leadJson(request, { error: "暂时无法保存，请稍后重试。" }, { status: 500 });
  }
}

function analyticsCorsHeaders(request: Request) {
  const origin = request.headers.get("origin") ?? "";
  const allowed = leadOrigins.has(origin) || origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:");
  return {
    "Access-Control-Allow-Origin": allowed ? origin : "https://www.aiarrival.cn",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function cleanText(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function parseAnalyticsEvent(request: Request): Promise<AnalyticsEvent | null> {
  const origin = request.headers.get("origin") ?? "";
  if (origin && !leadOrigins.has(origin) && !origin.startsWith("http://localhost:") && !origin.startsWith("http://127.0.0.1:")) return null;
  const payload = JSON.parse(await request.text()) as Record<string, unknown>;
  const eventType = cleanText(payload.eventType, 30);
  const visitorId = cleanText(payload.visitorId, 100);
  const sessionId = cleanText(payload.sessionId, 100);
  const pathname = cleanText(payload.pathname, 500);
  if (!visitorId || !sessionId || !pathname || !["page_view", "page_exit", "click"].includes(eventType)) return null;
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    visitorId,
    sessionId,
    eventType,
    pathname,
    title: cleanText(payload.title, 200),
    referrer: cleanText(payload.referrer),
    source: cleanText(payload.source, 120),
    campaign: cleanText(payload.campaign, 160),
    content: cleanText(payload.content, 160),
    audience: cleanText(payload.audience, 40),
    device: cleanText(payload.device, 30),
    label: cleanText(payload.label, 120),
    target: cleanText(payload.target),
    durationMs: Math.min(7_200_000, Math.max(0, Number(payload.durationMs) || 0)),
  };
}

async function saveAnalyticsEvent(event: AnalyticsEvent, env: Env | undefined) {
  if (env?.DB) {
    await env.DB.prepare(`
      INSERT INTO analytics_events (
        id, created_at, visitor_id, session_id, event_type, pathname, title,
        referrer, source, campaign, content, audience, device, label, target, duration_ms
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      event.id, event.createdAt, event.visitorId, event.sessionId, event.eventType, event.pathname,
      event.title, event.referrer, event.source, event.campaign, event.content, event.audience,
      event.device, event.label, event.target, String(event.durationMs),
    ).run();
    return;
  }
  const { mkdir, appendFile } = await import("node:fs/promises");
  await mkdir("/opt/aiarrival-website/shared", { recursive: true, mode: 0o700 });
  await appendFile(SERVER_ANALYTICS_FILE, `${JSON.stringify(event)}\n`, { encoding: "utf8", mode: 0o600 });
}

async function handleAnalyticsRequest(request: Request, env: Env | undefined) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: analyticsCorsHeaders(request) });
  if (request.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405 });
  try {
    const event = await parseAnalyticsEvent(request);
    if (!event) return Response.json({ error: "Invalid analytics event" }, { status: 400, headers: analyticsCorsHeaders(request) });
    await saveAnalyticsEvent(event, env);
    return new Response(null, { status: 204, headers: analyticsCorsHeaders(request) });
  } catch (error) {
    console.error("Analytics storage failed", error);
    return Response.json({ error: "Analytics unavailable" }, { status: 500, headers: analyticsCorsHeaders(request) });
  }
}

function base64Url(value: Uint8Array | string) {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : value;
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(normalized);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function toHex(value: ArrayBuffer) {
  return Array.from(new Uint8Array(value), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return mismatch === 0;
}

async function loadAdminConfig(env: Env | undefined): Promise<AdminConfig | null> {
  if (env?.ADMIN_USERNAME && env.ADMIN_SESSION_SECRET && (env.ADMIN_PASSWORD || (env.ADMIN_PASSWORD_HASH && env.ADMIN_PASSWORD_SALT))) {
    return {
      username: env.ADMIN_USERNAME,
      password: env.ADMIN_PASSWORD,
      passwordHash: env.ADMIN_PASSWORD_HASH,
      passwordSalt: env.ADMIN_PASSWORD_SALT,
      sessionSecret: env.ADMIN_SESSION_SECRET,
    };
  }
  try {
    const { readFile } = await import("node:fs/promises");
    return JSON.parse(await readFile(ADMIN_CONFIG_FILE, "utf8")) as AdminConfig;
  } catch {
    return null;
  }
}

async function verifyAdminPassword(password: string, config: AdminConfig) {
  if (config.password) return timingSafeEqual(password, config.password);
  if (!config.passwordHash || !config.passwordSalt) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const derived = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: fromBase64Url(config.passwordSalt), iterations: 150_000, hash: "SHA-256" },
    key,
    256,
  );
  return timingSafeEqual(toHex(derived), config.passwordHash);
}

async function signSession(payload: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return base64Url(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))));
}

async function createAdminSession(config: AdminConfig) {
  const payload = base64Url(JSON.stringify({ exp: Date.now() + 12 * 60 * 60 * 1000 }));
  return `${payload}.${await signSession(payload, config.sessionSecret)}`;
}

function readCookie(request: Request, name: string) {
  return request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1) ?? "";
}

async function hasValidAdminSession(request: Request, config: AdminConfig) {
  const [payload, signature] = readCookie(request, ADMIN_COOKIE).split(".");
  if (!payload || !signature || !timingSafeEqual(signature, await signSession(payload, config.sessionSecret))) return false;
  try {
    const data = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

function normalizeSource(event: AnalyticsEvent) {
  if (event.source) return event.source;
  if (!event.referrer) return "直接访问";
  try { return new URL(event.referrer).hostname.replace(/^www\./, ""); } catch { return "其他来源"; }
}

function buildSummary(events: AnalyticsEvent[], leads: Array<Record<string, string>>) {
  const views = events.filter((event) => event.eventType === "page_view");
  const exits = events.filter((event) => event.eventType === "page_exit" && event.durationMs > 0);
  const clickEvents = events.filter((event) => event.eventType === "click");
  const visitors = new Set(views.map((event) => event.visitorId));

  const pageMap = new Map<string, { visitors: Set<string>; views: number; durations: number[] }>();
  for (const event of views) {
    const row = pageMap.get(event.pathname) ?? { visitors: new Set<string>(), views: 0, durations: [] };
    row.visitors.add(event.visitorId); row.views += 1; pageMap.set(event.pathname, row);
  }
  for (const event of exits) {
    const row = pageMap.get(event.pathname) ?? { visitors: new Set<string>(), views: 0, durations: [] };
    row.durations.push(event.durationMs); pageMap.set(event.pathname, row);
  }

  const sourceMap = new Map<string, { visitors: Set<string>; views: number }>();
  for (const event of views) {
    const source = normalizeSource(event);
    const row = sourceMap.get(source) ?? { visitors: new Set<string>(), views: 0 };
    row.visitors.add(event.visitorId); row.views += 1; sourceMap.set(source, row);
  }

  const clickMap = new Map<string, { label: string; target: string; count: number }>();
  for (const event of clickEvents) {
    const key = `${event.label}|${event.target}`;
    const row = clickMap.get(key) ?? { label: event.label, target: event.target, count: 0 };
    row.count += 1; clickMap.set(key, row);
  }

  const average = (values: number[]) => values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0;
  return {
    generatedAt: new Date().toISOString(),
    overview: {
      visitors: visitors.size,
      views: views.length,
      averageDurationMs: average(exits.map((event) => event.durationMs)),
      clicks: clickEvents.length,
      leads: leads.length,
      completeLeads: leads.filter((lead) => lead.status === "complete").length,
    },
    pages: Array.from(pageMap, ([pathname, row]) => ({ pathname, visitors: row.visitors.size, views: row.views, averageDurationMs: average(row.durations) })).sort((a, b) => b.visitors - a.visitors),
    sources: Array.from(sourceMap, ([source, row]) => ({ source, visitors: row.visitors.size, views: row.views })).sort((a, b) => b.visitors - a.visitors).slice(0, 20),
    clicks: Array.from(clickMap.values()).sort((a, b) => b.count - a.count).slice(0, 20),
    leads: leads.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")),
    recent: events.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 100),
  };
}

async function readServerJsonLines(path: string) {
  try {
    const { readFile } = await import("node:fs/promises");
    const text = await readFile(path, "utf8");
    return text.split("\n").filter(Boolean).flatMap((line) => {
      try { return [JSON.parse(line) as Record<string, unknown>]; } catch { return []; }
    });
  } catch { return []; }
}

async function loadServerSummary() {
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const events = (await readServerJsonLines(SERVER_ANALYTICS_FILE)).filter((event) => Date.parse(String(event.createdAt || "")) >= cutoff) as unknown as AnalyticsEvent[];
  const leadEvents = await readServerJsonLines("/opt/aiarrival-website/shared/leads.ndjson");
  const leadMap = new Map<string, Record<string, string>>();
  for (const event of leadEvents) {
    const id = String(event.id || "");
    if (!id) continue;
    if (event.event === "quick") {
      leadMap.set(id, {
        id,
        createdAt: String(event.createdAt || ""), status: "quick", audience: String(event.audience || ""),
        name: String(event.name || ""), contact: String(event.contact || ""), identity: String(event.identity || ""),
        primaryGoal: String(event.primaryGoal || ""), currentStorage: String(event.currentStorage || ""), teamNeed: String(event.teamNeed || ""),
      });
    } else if (event.event === "complete" && leadMap.has(id)) {
      const lead = leadMap.get(id)!; lead.status = "complete"; lead.completedAt = String(event.completedAt || "");
      const result = event.result as Record<string, unknown> | undefined;
      lead.resultLabel = String(result?.label || ""); lead.resultService = String(result?.service || "");
    }
  }
  return buildSummary(events, Array.from(leadMap.values()));
}

async function loadD1Summary(db: D1Database) {
  const eventRows = (await db.prepare(`SELECT * FROM analytics_events WHERE created_at >= datetime('now', '-30 days') ORDER BY created_at DESC`).all()).results as Array<Record<string, unknown>>;
  const events = eventRows.map((row) => ({
    id: String(row.id), createdAt: String(row.created_at), visitorId: String(row.visitor_id), sessionId: String(row.session_id),
    eventType: String(row.event_type), pathname: String(row.pathname), title: String(row.title), referrer: String(row.referrer),
    source: String(row.source), campaign: String(row.campaign), content: String(row.content), audience: String(row.audience),
    device: String(row.device), label: String(row.label), target: String(row.target), durationMs: Number(row.duration_ms) || 0,
  }));
  const leadRows = (await db.prepare(`SELECT * FROM lead_requests ORDER BY created_at DESC LIMIT 1000`).all()).results as Array<Record<string, unknown>>;
  const leads = leadRows.map((row) => ({
    id: String(row.id), createdAt: String(row.created_at), status: String(row.status), audience: String(row.audience),
    name: String(row.name), contact: String(row.contact), identity: String(row.identity), primaryGoal: String(row.primary_goal),
    currentStorage: String(row.current_storage), teamNeed: String(row.team_need), resultLabel: String(row.result_label || ""), resultService: String(row.result_service || ""),
  }));
  return buildSummary(events, leads);
}

async function handleAdminRequest(request: Request, env: Env | undefined, pathname: string) {
  const config = await loadAdminConfig(env);
  if (!config) return Response.json({ error: "数据后台尚未配置登录凭据。" }, { status: 503 });

  if (pathname === "/api/admin/login" && request.method === "POST") {
    const payload = (await request.json()) as { username?: string; password?: string };
    const valid = timingSafeEqual(payload.username || "", config.username) && await verifyAdminPassword(payload.password || "", config);
    if (!valid) return Response.json({ error: "账号或密码不正确。" }, { status: 401 });
    const token = await createAdminSession(config);
    return Response.json({ loggedIn: true }, { headers: { "Set-Cookie": `${ADMIN_COOKIE}=${token}; Max-Age=43200; Path=/; HttpOnly; Secure; SameSite=Strict` } });
  }

  if (pathname === "/api/admin/logout" && request.method === "POST") {
    return Response.json({ loggedOut: true }, { headers: { "Set-Cookie": `${ADMIN_COOKIE}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict` } });
  }

  if (!await hasValidAdminSession(request, config)) return Response.json({ error: "请先登录。" }, { status: 401 });
  if (pathname === "/api/admin/summary" && request.method === "GET") {
    return Response.json(env?.DB ? await loadD1Summary(env.DB) : await loadServerSummary(), { headers: { "Cache-Control": "no-store" } });
  }
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/leads" || url.pathname.startsWith("/api/leads/")) {
      return handleLeadRequest(request, env, url.pathname);
    }

    if (url.pathname === "/api/analytics") {
      return handleAnalyticsRequest(request, env);
    }

    if (url.pathname.startsWith("/api/admin/")) {
      return handleAdminRequest(request, env, url.pathname);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
