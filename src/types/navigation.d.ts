import type { LucideIconName } from "@/components/ui/images/LucideIcon";

/** A single entry in a nav menu (header, footer, sidebar, mobile drawer). */
export type NavItem = {
  label: string;
  href: string;
  /** Registry-safe icon name — see components/ui/images/LucideIcon.tsx. Omit for text-only items. */
  icon?: LucideIconName;
  /** Marks external links so consumers can add target="_blank" + rel="noopener noreferrer". */
  external?: boolean;
  /** Nested items — for dropdown/flyout menus. Only one level deep is expected. */
  children?: NavItem[];
};

/** A named group of nav items — e.g. footer columns ("Product", "Company", "Legal"). */
export type NavSection = {
  title: string;
  items: NavItem[];
};
