import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { submitConversion } from "../lib/api.ts";
import { createDemoFiles, createSamplePdf } from "../lib/demo-samples.ts";
import { TOOLS, TOOL_CONFIGS } from "../lib/constants.ts";

test("every tool has built-in sample files with the expected count and extension", () => {
  for (const config of TOOLS) {
    const files = createDemoFiles(config);
    assert.equal(files.length, config.minFiles, config.id);
    assert.ok(files.every((file) => file.size > 0 && config.acceptedExtensions.some((extension) => file.name.endsWith(extension))), config.id);
  }
});

test("sample PDF offsets identify real objects and a three-page document", () => {
  const pdf = createSamplePdf();
  assert.ok(pdf.startsWith("%PDF-1.4"));
  assert.match(pdf, /\/Count 3/);
  const xref = Number(pdf.match(/startxref\n(\d+)/)[1]);
  assert.equal(pdf.slice(xref, xref + 4), "xref");
  const entries = pdf.slice(xref).split("\n").slice(3, 12);
  for (const [index, entry] of entries.entries()) {
    const offset = Number(entry.slice(0, 10));
    assert.ok(pdf.slice(offset).startsWith(`${index + 1} 0 obj`));
  }
});

test("simulation returns only the fixed sample, without accessing personal file data or network", async () => {
  const originalFetch = globalThis.fetch;
  let networkCalls = 0;
  globalThis.fetch = () => { networkCalls++; throw new Error("Unexpected network request"); };
  try {
    const privateFile = new Proxy({}, { get() { throw new Error("Simulation must not read selected file data"); } });
    const progress = [];
    const result = await submitConversion(TOOL_CONFIGS.word, [privateFile], {}, undefined, (value) => progress.push(value));
    assert.equal(networkCalls, 0);
    assert.equal(result.filename, "privcon-demo-sample.pdf");
    assert.equal(await result.blob.text(), createSamplePdf());
    assert.deepEqual(progress.map((value) => value.percent), [20, 60, 90]);
    assert.ok(progress.every((value) => value.message.includes("not converted or uploaded")));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("cancelling a simulation stops it without returning a result", async () => {
  const controller = new AbortController();
  await assert.rejects(submitConversion(TOOL_CONFIGS.word, createDemoFiles(TOOL_CONFIGS.word), {}, controller.signal, () => controller.abort()), { name: "AbortError" });
});

test("a pre-cancelled simulation never reports progress", async () => {
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(submitConversion(TOOL_CONFIGS.word, createDemoFiles(TOOL_CONFIGS.word), {}, controller.signal, () => assert.fail("Unexpected progress")), { name: "AbortError" });
});

test("the demo rejects an incomplete selection before simulating", async () => {
  await assert.rejects(submitConversion(TOOL_CONFIGS.merge, []), { code: "invalid_input" });
});

test("deployment policy blocks external connections, forms and frames", async () => {
  const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  const policy = config.headers[0].headers.find((header) => header.key === "Content-Security-Policy").value;
  assert.match(policy, /connect-src 'self' blob:;/);
  assert.match(policy, /form-action 'none';/);
  assert.match(policy, /frame-ancestors 'none'/);
  assert.equal(config.outputDirectory, "out");
  assert.equal(config.framework, null);
});
