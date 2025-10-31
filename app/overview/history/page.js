"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * REDIRECT PAGE - DO NOT REMOVE
 *
 * This page exists solely to maintain backward compatibility with the old
 * /overview/history URL structure. It redirects users to the new consolidated
 * overview page at /overview/urbit-explained with the appropriate anchor.
 *
 * Purpose: Redirect /overview/history → /overview/urbit-explained#history
 *
 * Note: In Next.js static export mode (`output: 'export'`), server-side redirects
 * via next.config.js are not supported. Client-side redirect pages like this one
 * are the standard approach for handling URL changes in static exports.
 */
export default function HistoryRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/overview/urbit-explained#history");
  }, [router]);

  return null;
}
