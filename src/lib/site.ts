/** Absolute origin for the deployed site, used anywhere an absolute URL is
 * required (OG image tags, LinkedIn share links). Vercel sets
 * NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL automatically;
 * falls back to localhost for local dev. */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const prodUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (prodUrl) return `https://${prodUrl}`;

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}
