import { Bookmark, CircleHelp, Crosshair, Home as HomeIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

export type NavKey = "home" | "dpi" | "save" | "help";

const items: { key: NavKey; label: string; icon: typeof HomeIcon; to: string }[] = [
  { key: "home", label: "Home", icon: HomeIcon, to: "/" },
  { key: "dpi", label: "DPI", icon: Crosshair, to: "/dpi" },
  { key: "save", label: "Save", icon: Bookmark, to: "/save" },
  { key: "help", label: "Help", icon: CircleHelp, to: "/help" },
];

export function BottomNav({ active }: { active: NavKey }) {
  return (
    <nav className="sticky bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto grid w-full max-w-md grid-cols-4 px-2 pb-3 pt-2">
        {items.map(({ key, label, icon: Icon, to }) => {
          const isActive = key === active;
          return (
            <Link
              key={key}
              to={to}
              className="group flex flex-col items-center gap-1 py-1"
              resetScroll={false}
            >
              <Icon
                className={`h-6 w-6 transition-colors ${
                  isActive
                    ? "text-primary drop-shadow-[0_0_8px_var(--color-primary)]"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              <span
                className={`h-0.5 w-8 rounded-full transition-all ${
                  isActive ? "bg-primary" : "bg-transparent"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
