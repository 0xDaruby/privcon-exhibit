import { Progress } from "@/components/ui/progress";
import type { ConversionProgress } from "@/lib/types";

interface ProgressStateProps {
  readonly files: readonly File[];
  readonly onCancel: () => void;
  readonly progress: ConversionProgress;
}

export function ProgressState({ files, onCancel, progress }: ProgressStateProps) {
  const selectedFilesLabel =
    files.length === 1 ? files[0]?.name : `${files.length} files selected`;
  const processingMessage = "Your selected files stay in this tab. This animation demonstrates the conversion flow.";
  const heading = progress.stage === "cancelling" ? "Stopping demo…" : "Simulating conversion…";

  return (
    <section
      aria-busy="true"
      aria-live="polite"
      className="state-panel processing-panel"
    >
      <div className="state-heading">
        <p className="configuration-eyebrow">Interface preview</p>
        <h1>{heading}</h1>
        <p>Demo only. No real conversion is being performed.</p>
      </div>
      <div className="processing-details">
        <div className="processing-summary">
          <span className="processing-summary-label">Selected for this demo</span>
          <strong title={selectedFilesLabel}>{selectedFilesLabel}</strong>
          <p>{processingMessage}</p>
        </div>
        <Progress
          label={progress.label}
          status={progress.message}
          value={progress.mode === "determinate" ? progress.percent : undefined}
        />
      </div>
      <button
        className="secondary-action"
        disabled={progress.stage === "cancelling"}
        onClick={onCancel}
        type="button"
      >
        {progress.stage === "cancelling" ? "Cancelling…" : "Cancel"}
      </button>
    </section>
  );
}
