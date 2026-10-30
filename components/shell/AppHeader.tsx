"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BackendMonitorIcon } from "@/components/icons/PrivConIcons";
import { TOOLS } from "@/lib/constants";
import { ToolSwitcher } from "@/components/shell/ToolSwitcher";
import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle";

export function AppHeader() {
  const pathname = usePathname().replace(/\/+$/, "") || "/";
  const currentTool = TOOLS.find((tool) => tool.route === pathname);

  return (
    <header className="global-header">
      <nav className="brand-navigation" aria-label="Primary navigation">
        <Link className="brand-link" href="/" aria-label="PrivCon home">
          <Image
            alt="PrivCon"
            className="brand-lockup"
            height={49}
            priority
            src="/brand/privcon-lockup.png"
            width={222}
          />
        </Link>
        <span className="header-rule" aria-hidden="true" />
        {currentTool ? <span className="header-current-tool">{currentTool.title}</span> : <span className="header-current-tool">Document tools</span>}
        <ToolSwitcher />
      </nav>

      <div className="header-utilities">
      <AnimatedThemeToggle />
      <div
        aria-label="Interface demo. No backend required."
        className="backend-status"
        data-state="running"
        role="status"
      >
        <BackendMonitorIcon />
        <span className="backend-label">Exhibit</span>
        <span className="status-pill">Demo</span>
      </div>
      </div>
    </header>
  );
}
