export function FlightDivider({ maxWidth = 320 }: { maxWidth?: number }) {
  return (
    <div className="flex items-center justify-center gap-2.5 px-4 pt-4 sm:px-6">
      <span
        className="h-0 flex-1 border-t-2 border-dashed border-edge-card"
        style={{ maxWidth }}
      />
      <span className="h-[7px] w-[7px] flex-none rounded-full bg-coral" />
      <span
        className="h-0 flex-1 border-t-2 border-dashed border-edge-card"
        style={{ maxWidth }}
      />
    </div>
  );
}
