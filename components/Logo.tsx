export function Logo({ size = 30 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex flex-none items-center justify-center rounded-full border-[1.4px] border-ink"
      style={{ width: size, height: size }}
    >
      {/* Ecuador */}
      <span className="absolute left-[17%] right-[17%] top-1/2 h-[1.1px] bg-ink" />
      {/* Meridiano */}
      <span
        className="absolute left-1/2 top-[10%] bottom-[10%] rounded-full border-[1.1px] border-ink"
        style={{ width: size * 0.3, marginLeft: -(size * 0.15) }}
      />
      {/* Pin de ubicación */}
      <span className="absolute -right-px -top-px h-1.5 w-1.5 rounded-full bg-coral" />
    </span>
  );
}
