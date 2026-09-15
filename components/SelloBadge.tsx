import type { ReactNode } from "react";

// Rotaciones "a mano" — nunca 0deg. Se elige por índice para que elementos
// contiguos no compartan la misma inclinación (ver README de diseño).
const ROTATIONS = ["-1.8deg", "1.4deg", "-1.4deg", "1.8deg", "-1.6deg", "1.3deg"];

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
      className={`inline-flex flex-none items-center rounded-[6px] border-[1.5px] border-dashed border-maroon px-[9px] py-[3px] text-[10.5px] font-bold uppercase tracking-wide text-maroon ${className}`}
      style={{ transform: `rotate(${rotate ?? "-1.6deg"})` }}
    >
      {children}
    </span>
  );
}
