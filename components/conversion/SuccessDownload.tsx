"use client";

import { PrivacyShieldCheckIcon, SuccessCheckIcon } from "@/components/icons/PrivConIcons";
import type { ConversionOutputType } from "@/lib/types";

interface SuccessDownloadProps {
  readonly downloadUrl: string;
  readonly filename: string;
  readonly outputType: ConversionOutputType;
  readonly onConvertAgain: () => void;
}

export function SuccessDownload({ downloadUrl, filename, onConvertAgain }: SuccessDownloadProps) {
  return (
    <section className="state-panel success-panel" aria-live="polite">
      <SuccessCheckIcon className="state-icon" />
      <div className="state-heading">
        <p className="configuration-eyebrow">Demo complete</p>
        <h1>You’ve reached the result screen</h1>
        <p>This was a simulated conversion. Your selected files were not converted or uploaded.</p>
        <p>You can download a built-in sample PDF to preview the download experience.</p>
      </div>
      <a className="primary-action state-primary" download={filename} href={downloadUrl}>Download sample PDF</a>
      <button className="secondary-action" onClick={onConvertAgain} type="button">Try another demo</button>
      <div className="compact-privacy state-privacy"><PrivacyShieldCheckIcon /><span>Your selected files stayed in this browser tab.</span></div>
    </section>
  );
}
