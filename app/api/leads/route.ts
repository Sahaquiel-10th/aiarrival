import { getDb } from "../../../db";
import { leadRequests } from "../../../db/schema";
import { corsHeaders, json } from "./cors";

type QuickLeadPayload = {
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

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as QuickLeadPayload;
    const required = [
      payload.contact,
      payload.identity,
      payload.primaryGoal,
      payload.currentStorage,
      payload.teamNeed,
    ];

    if (required.some((value) => !value?.trim()) || payload.consent !== true) {
      return json(request, { error: "请完成快速诊断并同意我们联系你。" }, { status: 400 });
    }

    const id = crypto.randomUUID();
    await getDb().insert(leadRequests).values({
      id,
      audience: payload.audience === "expert" ? "expert" : "founder",
      name: payload.name?.trim() ?? "",
      contact: payload.contact!.trim(),
      identity: payload.identity!.trim(),
      primaryGoal: payload.primaryGoal!.trim(),
      currentStorage: payload.currentStorage!.trim(),
      teamNeed: payload.teamNeed!.trim(),
      sourceUrl: payload.sourceUrl?.slice(0, 500) ?? "",
      consentAt: new Date().toISOString(),
    });

    return json(request, { id, saved: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to save quick diagnosis lead", error);
    return json(request, { error: "暂时无法保存，请稍后重试。" }, { status: 500 });
  }
}
