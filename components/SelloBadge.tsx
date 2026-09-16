import type { ReactNode } from "react";

// Rotaciones "a mano", mucho más discretas que en la iteración anterior
// (±0.5–0.8deg) — para que se sienta cuidado y no "sticker".
const ROTATIONS = ["-0.8deg", "0.6deg", "-0.6deg", "0.7deg", "-0.7deg", "0.5deg"];

export function selloRotation(index: number): string {
  return ROTATIONS[index % ROTATIONS.length];
}

export function SelloBadge({
  children,
  rotate,
  className = "",
}: {
  children: ReactNode;
  rotate?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex flex-none items-center rounded-[4px] border-[1.2px] border-dashed border-coral px-2 py-[1.5px] text-[10px] font-semibold uppercase tracking-wide text-coral ${className}`}
      style={{ transform: `rotate(${rotate ?? "-0.7deg"})` }}
    >
      {children}
    </span>
  );
}
