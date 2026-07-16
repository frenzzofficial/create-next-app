"use client";

import Link from "next/link";
import { useNavigationActions } from "@/components/providers/NavigationProvider";
import { appConfig } from "@/packages/configs/app.configs";

const NavbarMobileFooter = () => {
  const { setMobileMenuOpen } = useNavigationActions();

  return (
    <div className="mobile-drawer-footer">
      <Link
        href={appConfig.routes.signin}
        className="btn primary-btn mobile-sign-btn"
        onClick={() => setMobileMenuOpen(false)}
      >
        Sign In
      </Link>
    </div>
  );
};

export default NavbarMobileFooter;
