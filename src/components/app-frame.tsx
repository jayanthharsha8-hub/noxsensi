import type { ReactNode } from "react";

import { BottomNav, type NavKey } from "@/components/bottom-nav";

/** Phone-width app frame shared by every screen. */
export function AppFrame({
  active,
  children,
}: {
  active: NavKey;
  children: ReactNode;
}) {
  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background shadow-card sm:border-x sm:border-border">
      {/* subtle blue glow behind the top area, like the references */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-40"
        style={{
          background:
            "radial-gradient(120% 90% at 85% 0%, color-mix(in oklab, var(--glow) 55%, transparent), transparent 70%)",
        }}
      />
      <main className="relative flex-1 px-4 pb-6 pt-4">{children}</main>
      <BottomNav active={active} />
    </div>
  );
}
