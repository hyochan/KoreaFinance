"use client";

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

// Create client only if URL is available (not during static build)
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  // During SSR/prerendering without convex URL, render nothing
  // This prevents hooks that need ConvexProvider from being called
  if (!convex) {
    return null;
  }

  return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>;
}
