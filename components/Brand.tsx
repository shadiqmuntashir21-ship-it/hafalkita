export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand-wrap" aria-label="HafalKita">
      <div className="brand-mark" aria-hidden="true">
        <span className="mark-page mark-page-a" />
        <span className="mark-page mark-page-b" />
        <span className="mark-dot" />
      </div>
      {!compact && (
        <div className="brand-copy">
          <strong>HafalKita</strong>
          <span>Ruang kerja guru tahfidz</span>
        </div>
      )}
    </div>
  );
}
