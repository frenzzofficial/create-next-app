"use client";

import Link from "next/link";
import Theme from "@/components/layouts/Theme";
import {
  useNavigationActions,
  useNavigationState,
} from "@/components/providers/NavigationProvider";
import { Button } from "@/components/ui";
import { appConfig } from "@/packages/configs/app.configs";

const NavbarDesktopAction = () => {
  const mobileMenuOpen = useNavigationState("mobileMenuOpen");
  const { toggleMobileMenu } = useNavigationActions();

  return (
    <div className="header-actions">
      <Theme />
      {/* A navigation destination, not an in-page action — rendered as a
          real link (styled like a button) rather than <Button>, so it's
          an <a> under the hood and actually goes somewhere. */}
      <Link href={appConfig.routes.signin} className="btn link-btn login-btn">
        Sign In
      </Link>

      {/* Mobile Menu Toggle Burger Button */}
      <Button
        className={`mobile-toggle-btn ${mobileMenuOpen ? "open" : ""}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
        variant="ghost"
      >
        <span />
        <span />
        <span />
      </Button>
    </div>
  );
};

export default NavbarDesktopAction;
