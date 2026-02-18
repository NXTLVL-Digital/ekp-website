import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  tags: string[];
};

/**
 * Webhook handler for on-demand ISR triggered by Sanity.
 *
 * Sanity webhook configuration (at manage.sanity.io > API > Webhooks):
 * - URL: https://[deployment-url]/api/revalidate
 * - Trigger on: Create, Update, Delete
 * - Filter: _type in ["siteSettings", "homepage", "servicePage", "gallery", "testimonial", "cityLandingPage"]
 * - Projection: {"tags": [_type, _type + ":" + slug.current]}
 * - Secret: Must match SANITY_REVALIDATE_SECRET env var
 */
export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response("Missing SANITY_REVALIDATE_SECRET", { status: 500 });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true, // wait for Sanity CDN to update before revalidating
    );

    if (!isValidSignature) {
      return new Response(
        JSON.stringify({ message: "Invalid signature" }),
        { status: 401 },
      );
    }

    if (!Array.isArray(body?.tags) || !body.tags.length) {
      return new Response(
        JSON.stringify({ message: "Bad Request" }),
        { status: 400 },
      );
    }

    body.tags.forEach((tag) => revalidateTag(tag));

    return NextResponse.json({
      revalidated: true,
      tags: body.tags,
    });
  } catch (err) {
    console.error(err);
    return new Response((err as Error).message, { status: 500 });
  }
}
