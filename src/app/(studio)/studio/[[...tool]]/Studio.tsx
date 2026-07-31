"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";
import { projectId } from "@/sanity/env";

export default function Studio() {
  if (!projectId) {
    return (
      <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
        <h1>Sanity Studio needs setup</h1>
        <p>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in your{" "}
          <code>.env.local</code> file and in Vercel project settings to connect
          the Studio.
        </p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
