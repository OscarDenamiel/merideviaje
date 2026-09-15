export function Logo({ size = 34 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex flex-none items-center justify-center rounded-full border-2 border-dashed border-maroon"
      style={{ width: size, height: size }}
    >
      {/* Ecuador */}
      <span className="absolute left-[18%] right-[18%] top-1/2 h-[1.3px] bg-maroon opacity-55" />
      {/* Meridiano */}
      <span
        className="absolute left-1/2 top-[10%] bottom-[10%] rounded-full border-[1.3px] border-maroon opacity-55"
        style={{ width: size * 0.32, marginLeft: -(size * 0.16) }}
      />
      {/* Pin de ubicación */}
      <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-coral" />
    </span>
  );
}
