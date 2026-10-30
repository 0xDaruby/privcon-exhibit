import type { ToolConfig } from "./types";

/** A synthetic PDF with real offsets, safe to render without any network. */
export function createSamplePdf(): string {
  const objects: string[] = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R 5 0 R 7 0 R] /Count 3 >>",
  ];
  for (let page = 1; page <= 3; page++) {
    const stream = [
      "BT /F1 28 Tf 56 720 Td (PrivCon) Tj",
      "0 -48 Td /F1 18 Tf (A private workspace for your documents.) Tj",
      "0 -42 Td /F1 12 Tf (This is a built-in sample for the interface demo.) Tj",
      "0 -24 Td (No personal documents are included.) Tj",
      "0 -52 Td (Explore the tools. Adjust the options. Make it yours.) Tj",
      `0 -440 Td (Sample page ${page} of 3) Tj ET`,
    ].join("\n");
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 9 0 R >> >> /Contents ${page * 2 + 2} 0 R >>`);
    objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  }
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const [index, object] of objects.entries()) {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  }
  const startXref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  pdf += offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
  return pdf;
}

export function createDemoFiles(config: ToolConfig): readonly File[] {
  if (config.id === "images") {
    const bytes = Uint8Array.from(atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aL1sAAAAASUVORK5CYII="), (character) => character.charCodeAt(0));
    return [new File([bytes], "sample-image.png", { type: "image/png", lastModified: 0 })];
  }
  const extension = config.acceptedExtensions[0];
  return Array.from({ length: config.minFiles }, (_, index) => new File(
    [extension === ".pdf" ? createSamplePdf() : "PrivCon interface demo. Synthetic placeholder; no conversion is performed."],
    `sample-${index + 1}${extension}`,
    { type: extension === ".pdf" ? "application/pdf" : "application/octet-stream", lastModified: 0 },
  ));
}
