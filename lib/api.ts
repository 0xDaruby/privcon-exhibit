import { createSamplePdf } from "./demo-samples.ts";
import type { ConversionExtraFields, ConversionProgress, ConversionResult, ToolConfig } from "./types";

export class PrivConApiError extends Error {
  readonly code: string;
  readonly status?: number;
  constructor(code: string, message: string, status?: number) {
    super(message);
    this.name = "PrivConApiError";
    this.code = code;
    this.status = status;
  }
}

function waitForDemoStep(milliseconds: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Demo cancelled", "AbortError"));
      return;
    }
    const onAbort = () => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", onAbort);
      reject(new DOMException("Demo cancelled", "AbortError"));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, milliseconds);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/** Simulate only the interface; the downloadable PDF is a fixed public sample. */
export async function submitConversion(
  config: ToolConfig,
  files: readonly File[],
  _extraFields: ConversionExtraFields = {},
  signal?: AbortSignal,
  onProgress: (progress: ConversionProgress) => void = () => undefined,
): Promise<ConversionResult> {
  // The existing option controls remain interactive; this exhibit does not execute them.
  void _extraFields;
  if (signal?.aborted) throw new DOMException("Demo cancelled", "AbortError");
  if (files.length < config.minFiles || files.length > config.maxFiles) {
    throw new PrivConApiError("invalid_input", "Choose the required number of files to explore this demo.");
  }
  const stages = [
    { stage: "validating", label: "Previewing the workflow", percent: 20 },
    { stage: "converting", label: "Simulating conversion", percent: 60 },
    { stage: "finalizing", label: "Preparing the sample result", percent: 90 },
  ] as const;
  for (const stage of stages) {
    onProgress({ ...stage, message: "Interface demo only. Your selected files stay in this tab and are not converted or uploaded.", mode: "determinate" });
    await waitForDemoStep(450, signal);
  }
  if (signal?.aborted) throw new DOMException("Demo cancelled", "AbortError");
  return {
    blob: new Blob([createSamplePdf()], { type: "application/pdf" }),
    contentType: "application/pdf",
    filename: "privcon-demo-sample.pdf",
    outputType: "pdf",
  };
}
