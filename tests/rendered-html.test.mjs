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

test("renders the customer-facing service introduction", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /让你的经验/);
  assert.match(html, /先测测我的情况/);
  assert.match(html, /开始免费诊断/);
  assert.match(html, /href="\/diagnosis"/);
  assert.doesNotMatch(html, /不让客户学习一堆技术名词/);
  assert.doesNotMatch(html, /都只是底座/);
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
