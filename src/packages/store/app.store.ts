import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * app.store.ts
 * --------------------------------------------------------------
 * Global UI state that isn't a good fit for URL state, server state (that's
 * Stage 10's job via services + asyncHandler), or a single component's
 * local state — things like "is the mobile nav open right now" that
 * multiple components (Header, the nav itself, an overlay backdrop) all
 * need to read and write.
 *
 * Theme is intentionally NOT here — next-themes + ThemeProvider already
 * own that (see components/providers/ThemeProvider.tsx). Don't duplicate
 * it in this store.
 *
 * Flat file for now, matching how the rest of packages/services is
 * currently structured. Stage 3's tree describes context/reducers/slices
 * subfolders for when the store grows past one slice — split this out
 * once there's a second concern that justifies it, rather than
 * pre-building empty folders.
 */

type AppState = {
  isMobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;

  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isMobileNavOpen: false,
      openMobileNav: () => set({ isMobileNavOpen: true }),
      closeMobileNav: () => set({ isMobileNavOpen: false }),
      toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),

      isSidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    }),
    {
      name: "app-store",
      // Mobile nav open/closed shouldn't survive a refresh — only persist
      // durable preferences like the sidebar's collapsed state.
      partialize: (state) => ({ isSidebarCollapsed: state.isSidebarCollapsed }),
    },
  ),
);
