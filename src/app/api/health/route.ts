import { NextResponse } from "next/server";
import { envAppConfig } from "@/packages/env/app.env";

/**
 * GET /api/health
 * --------------------------------------------------------------
 * Minimal liveness check — for uptime monitors, load balancer health
 * probes, or a quick "is the deployed build actually running" sanity
 * check. Intentionally has no auth and touches no database, so it stays
 * usable even when a downstream dependency is down.
 *
 * `app/api` didn't exist anywhere in the tree before this — this route
 * is here so the folder ships with one real, working example instead of
 * an empty directory Git wouldn't track anyway.
 */
export const GET = () =>
  NextResponse.json({
    status: "ok",
    environment: envAppConfig.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
