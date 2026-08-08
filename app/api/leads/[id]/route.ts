import { eq, sql } from "drizzle-orm";
import { getDb } from "../../../../db";
import { leadRequests } from "../../../../db/schema";
import { corsHeaders, json } from "../cors";

type DeepDiagnosisPayload = {
  answers?: unknown;
  result?: {
    label?: string;
    maturity?: string;
    service?: string;
  };
};

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const payload = (await request.json()) as DeepDiagnosisPayload;
    if (!id || !payload.answers || !payload.result) {
      return json(request, { error: "诊断内容不完整。" }, { status: 400 });
    }

    await getDb()
      .update(leadRequests)
      .set({
        status: "complete",
        updatedAt: sql`CURRENT_TIMESTAMP`,
        deepAnswers: JSON.stringify(payload.answers).slice(0, 30000),
        resultLabel: payload.result.label?.slice(0, 100) ?? "",
        resultMaturity: payload.result.maturity?.slice(0, 100) ?? "",
        resultService: payload.result.service?.slice(0, 160) ?? "",
      })
      .where(eq(leadRequests.id, id));

    return json(request, { saved: true });
  } catch (error) {
    console.error("Failed to complete diagnosis lead", error);
    return json(request, { error: "深度结果暂时未同步，但快速诊断已经保存。" }, { status: 500 });
  }
}
