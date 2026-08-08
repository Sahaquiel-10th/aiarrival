/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB?: D1Database;
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
]);

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

async function handleLeadRequest(request: Request, env: Env, pathname: string) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: leadCorsHeaders(request) });
  }
  if (!env.DB) {
    return leadJson(request, { error: "线索存储暂未就绪，请稍后重试。" }, { status: 503 });
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
