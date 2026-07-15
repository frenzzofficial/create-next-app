import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * app.store.ts
 * --------------------------------------------------------------
 * Global, durable-leaning UI state — things that need to survive a
 * refresh (a collapsed sidebar preference) or are read from more than
 * one unrelated part of the tree.
 *
 * Theme is intentionally NOT here — next-themes + ThemeProvider already
 * own that (see components/providers/ThemeProvider.tsx). Don't duplicate
 * it in this store.
 *
 * The mobile nav drawer's open/closed state is ALSO intentionally not
 * here anymore — it moved to NavigationProvider's own scoped store
 * (packages/store/navigation.store.ts) once the header grew dropdown
 * and accordion state that needed the same treatment. Keeping one flag
 * here and the rest there would mean two sources of truth for what is
 * really one subsystem's UI state; NavigationProvider owns all of it.
 *
 * Flat file for now, matching how the rest of packages/services is
 * currently structured. Stage 3's tree describes context/reducers/slices
 * subfolders for when the store grows past one slice — split this out
 * once there's a second concern that justifies it, rather than
 * pre-building empty folders.
 */

type AppState = {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isSidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    }),
    {
      name: "app-store",
      partialize: (state) => ({ isSidebarCollapsed: state.isSidebarCollapsed }),
    },
  ),
);
