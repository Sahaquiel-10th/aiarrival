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
  assert.match(html, /将 AI/);
  assert.match(html, /企业真正缺少的/);
  assert.match(html, /真实案例/);
  assert.match(html, /开始免费诊断/);
  assert.match(html, /href="\/diagnosis"/);
  assert.match(html, /href="\/knowledge-assets"/);
});

test("renders the knowledge asset service at its own route", async () => {
  const response = await render("/knowledge-assets");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /让你的经验/);
  assert.match(html, /先测测我的情况/);
  assert.match(html, /href="\/diagnosis"/);
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
  assert.match(html, /看看你的经验和资料/);
  assert.match(html, /免费诊断/);
  assert.match(html, /你目前的身份是/);
  assert.match(html, /不会自动发送或保存/);
});
