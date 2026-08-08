const allowedOrigins = new Set([
  "https://aiarrival.cn",
  "https://www.aiarrival.cn",
  "https://ai-knowledge-assets-2026.sahaquile.chatgpt.site",
]);

export function corsHeaders(request: Request) {
  const origin = request.headers.get("origin") ?? "";
  const allowed =
    allowedOrigins.has(origin) ||
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:");

  return {
    "Access-Control-Allow-Origin": allowed ? origin : "https://www.aiarrival.cn",
    "Access-Control-Allow-Methods": "POST, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function json(request: Request, body: unknown, init: ResponseInit = {}) {
  return Response.json(body, {
    ...init,
    headers: { ...corsHeaders(request), ...init.headers },
  });
}
