"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useCallback, useEffect, useRef } from "react";
import {
  useNavigationActions,
  useNavigationState,
} from "@/components/providers/NavigationProvider";
import { Button } from "@/components/ui";
import { mainNav } from "@/packages/configs/navigation.config";
import { FindAnimation } from "@/packages/utils/animation";
import type { DropdownCategory, NavTab } from "@/types/navigation";

type NavItemProps = {
  tab: NavTab;
  isActive: boolean;
  onSelect: (id: string | null) => void;
};

// The panel sits `calc(100% + 0.25rem)` below its trigger (navigation.css)
// so there's a visible gap for polish — but that gap is a dead zone for
// hover: a straight mouse path from the button down into the panel spends
// a moment over neither element. Closing on that crossing made the menu
// feel impossible to navigate into. This delay gives re-entering (the
// button OR the panel, both call handleEnter) a chance to cancel the
// close before it actually happens.
const DROPDOWN_CLOSE_DELAY_MS = 200;

const NavItem = memo(({ tab, isActive, onSelect }: NavItemProps) => {
  const pathname = usePathname();
  const hasDropdown = Boolean(tab.dropdown?.length);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current === null) return;
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  }, []);

  const handleEnter = useCallback(() => {
    clearCloseTimeout();
    onSelect(tab.id);
  }, [onSelect, tab.id, clearCloseTimeout]);

  const handleLeave = useCallback(() => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => onSelect(null), DROPDOWN_CLOSE_DELAY_MS);
  }, [onSelect, clearCloseTimeout]);

  // Don't leave a pending close running after this item unmounts.
  useEffect(() => clearCloseTimeout, [clearCloseTimeout]);

  const animation = FindAnimation("zoom", "bottom");

  // No dropdown for this tab -> it's just a destination. Render a plain Link,
  // skip the hover handlers and mega-dropdown markup entirely (nothing to
  // toggle, so no reason to touch the shared navigation store for this item),
  // and highlight it when it matches the current route.
  if (!hasDropdown) {
    const isCurrentRoute = tab.href !== undefined && pathname === tab.href;

    return (
      <li className="nav-item">
        <Link href={tab.href ?? "#"} className={`nav-btn ${isCurrentRoute ? "active" : ""}`}>
          {tab.title}
        </Link>
      </li>
    );
  }

  return (
    <li className="nav-item" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Button
        variant="ghost"
        className={`nav-btn ${isActive ? "active" : ""}`}
        aria-haspopup="true"
        aria-expanded={isActive}
      >
        {tab.title}
        <span className="chevron-arrow" />
      </Button>

      {/* Content-Driven Dropdown Panel */}
      <div className={`mega-dropdown ${isActive ? "is-visible" : ""}`}>
        <div
          className="mega-dropdown-inner"
          style={{
            animation: animation,
          }}
        >
          {tab.dropdown?.map((subCat: DropdownCategory) => (
            <div key={subCat.category} className="dropdown-column">
              <h4 className="column-heading">{subCat.category}</h4>
              <ul className="column-links">
                {subCat.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="dropdown-link-item">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
});

NavItem.displayName = "NavItem";

const NavbarDesktop = () => {
  const activeDropdown = useNavigationState("activeDropdown");
  const { setActiveDropdown } = useNavigationActions();

  return (
    <nav className="desktop-nav">
      <ul className="nav-links-list">
        {mainNav.map((tab: NavTab) => (
          <NavItem
            key={tab.id}
            tab={tab}
            isActive={activeDropdown === tab.id}
            onSelect={setActiveDropdown}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NavbarDesktop;
