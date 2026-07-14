"use client";

import { BREAKPOINTS, type BreakpointKey } from "@/packages/configs/theme.config";
import { useMediaQuery } from "./useMediaQuery";

type UseBreakpointsResult = {
  /** `true` once viewport width >= each breakpoint's threshold. */
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
  /** Convenience aliases matching common device-class naming. */
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

/**
 * useBreakpoints.ts
 * --------------------------------------------------------------
 * Tailwind-breakpoint-aware viewport checks, built on `useMediaQuery`.
 * Reads thresholds from `BREAKPOINTS` in packages/configs/theme.config.ts
 * — the single source of truth shared with the Tailwind `@theme` config —
 * so this hook never drifts out of sync with the CSS breakpoints.
 *
 *   const { isMobile, isDesktop } = useBreakpoints();
 *
 *   if (isMobile) return <MobileNav />;
 *
 * Prefer Tailwind's responsive classes (`md:flex`) for pure styling —
 * reach for this hook only when a *decision* needs to be made in JS
 * (rendering a different component, not just different classes).
 */
export const useBreakpoints = (): UseBreakpointsResult => {
  const isSm = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`);
  const isMd = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
  const isLg = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
  const isXl = useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`);
  const is2xl = useMediaQuery(`(min-width: ${BREAKPOINTS["2xl"]}px)`);

  return {
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    isMobile: !isMd,
    isTablet: isMd && !isLg,
    isDesktop: isLg,
  };
};

export type { BreakpointKey };
