import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the Jianglin Technology corporate homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /AI第二大脑与智能员工/);
  assert.match(html, /企业真正缺少的/);
  assert.match(html, /真实业务/);
  assert.match(html, /开始免费诊断/);
  assert.match(html, /href="\/diagnosis"/);
  assert.match(html, /href="\/knowledge-assets"/);
  assert.match(html, /https:\/\/agent\.aiarrival\.cn/);
});

test("renders the knowledge asset service at its own route", async () => {
  const response = await render("/knowledge-assets");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /AI不用从头学/);
  assert.match(html, /到手即用，让AI自动记住你的每一句话/);
  assert.match(html, /点此立即加入【AI第二大脑启动计划】/);
  assert.match(html, /¥3,999 起/);
  assert.match(html, /自动积累/);
  assert.match(html, /带新员工/);
  assert.match(html, /老板继续经营，AI负责积累/);
  assert.match(html, /AI时代，老板最大的资产正在被浪费/);
  assert.match(html, /15天后，你将拥有/);
  assert.match(html, /一个懂你的AI助手/);
  assert.match(html, /我们帮你完成第一次AI经验资产化/);
  assert.match(html, /从个人经验沉淀，到企业知识资产体系/);
  assert.match(html, /AI知识资产成长路径/);
  assert.match(html, /进入知识分身展厅/);
  assert.match(html, /href="\/diagnosis\?audience=founder"/);
});

test("renders the protected advertising data center shell", async () => {
  const response = await render("/data-center");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /正在确认登录状态/);
});

test("renders the expert AI twin advertising entry", async () => {
  const response = await render("/expert-ai-twin");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /让你的专业经验.*服务更多人/s);
  assert.match(html, /免费评估我的AI专家潜力/);
  assert.match(html, /¥3,999 起/);
  assert.match(html, /AI不是替代专家，而是帮助专家服务更多人/);
  assert.match(html, /你的专业价值，不应该只存在于你的时间里/);
  assert.match(html, /AI学员助教/);
  assert.match(html, /不需要研究AI，我们帮你完成专家经验资产化/);
  assert.match(html, /看看不同专家如何拥有自己的AI助手/);
  assert.match(html, /商业增长工具/);
  assert.match(html, /href="\/diagnosis\?audience=expert"/);
});

test("renders services and case evidence pages", async () => {
  const services = await render("/services");
  assert.equal(services.status, 200);
  assert.match(await services.text(), /企业 AI 咨询与场景诊断/);

  const cases = await render("/cases");
  assert.equal(cases.status, 200);
  const caseHtml = await cases.text();
  assert.match(caseHtml, /小象优选/);
  assert.match(caseHtml, /99.99%/);
  assert.match(caseHtml, /数据口径/);
});

test("renders the knowledge asset diagnosis questionnaire", async () => {
  const response = await render("/diagnosis");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /2分钟快速诊断/);
  assert.match(html, /5个关键问题/);
  assert.match(html, /你目前的身份是/);
  assert.match(html, /手机号或微信号/);
  assert.match(html, /安全保存/);
});
