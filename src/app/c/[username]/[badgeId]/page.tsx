import type { Metadata } from "next";
import BadgePlate from "@/components/badges/BadgePlate";
import CertificateActions from "@/components/badges/CertificateActions";
import { badgeById, plateValue } from "@/lib/badges";
import { getSiteUrl } from "@/lib/site";
import { createPublicClient } from "@/lib/supabase/public";

interface PageProps {
  params: Promise<{ username: string; badgeId: string }>;
}

// A certificate's data is permanent once earned (see fetchCertificate below),
// so this page doesn't need to be re-rendered on every hit — real ISR
// caching instead of forced SSR. Paired with the cookie-free public
// Supabase client below (a cookie-reading client forces dynamic rendering
// regardless of this setting).
export const revalidate = 3600;

// No paths are known at build time (every username/badgeId combo is
// user-generated), but returning an empty array here still opts this
// route into the static/ISR pipeline: the first hit for a given
// username/badgeId renders once and gets cached for `revalidate` seconds
// (dynamicParams defaults to true), instead of every hit paying for a
// fresh render like a plain dynamic segment without generateStaticParams
// does.
export async function generateStaticParams() {
  return [];
}

interface CertificateRow {
  username: string;
  display_name: string | null;
  badge_id: string;
  earned_at: string;
}

/**
 * Looks up a certificate through the public `certificate_badges` view (see
 * supabase/migrations/0003_public_certificates.sql) — the one and only
 * source of truth for "did this person actually earn this badge". Readable
 * by the anon role, so this works whether or not the visitor is signed in.
 */
async function fetchCertificate(username: string, badgeId: string): Promise<CertificateRow | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("certificate_badges")
    .select("username, display_name, badge_id, earned_at")
    .eq("username", username)
    .eq("badge_id", badgeId)
    .maybeSingle();

  if (error) {
    console.error("[certificate] lookup failed:", error.message);
    return null;
  }
  return data as CertificateRow | null;
}

function ogImageUrl(username: string, badgeId: string) {
  const url = new URL("/api/og/badge", getSiteUrl());
  url.searchParams.set("username", username);
  url.searchParams.set("badgeId", badgeId);
  return url.toString();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username, badgeId } = await params;
  const badge = badgeById(badgeId);
  if (!badge) return { title: "Badge not found — AlgoVerse" };

  const cert = await fetchCertificate(username, badgeId);
  if (!cert) return { title: "Certificate not found — AlgoVerse" };

  const title = `${badge.name} — AlgoVerse Achievement`;
  const description = `${badge.tierLabel} · ${badge.description}`;
  const image = ogImageUrl(username, badgeId);
  const pageUrl = new URL(`/c/${username}/${badgeId}`, getSiteUrl());

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl.toString(),
      siteName: "AlgoVerse",
      images: [{ url: image, width: 1200, height: 630, alt: `${badge.name} achievement plate` }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function CertificatePage({ params }: PageProps) {
  const { username, badgeId } = await params;
  const badge = badgeById(badgeId);
  const cert = badge ? await fetchCertificate(username, badgeId) : null;
  const siteUrl = getSiteUrl();

  // Bad badge id, or a badge id this username has no earned record for
  // (not yet earned, mistyped link, or the 0003 migration hasn't been run
  // on this database yet) — render a clear state instead of a 404/500 or a
  // certificate that lies about who earned it.
  if (!badge || !cert) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-16 bg-[#08090d]">
        <div className="w-full max-w-md rounded-2xl border border-[#1c2030] bg-[#0e1018] p-8 text-center text-[#eef1f8]">
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#00e5ff]">
            Verified Credential · AlgoVerse
          </p>
          <h1 className="mt-4 text-xl font-bold">Certificate not found</h1>
          <p className="mt-2 text-sm text-[#8b93a8]">
            {badge
              ? `${username} hasn't earned the "${badge.name}" badge yet — or this link is wrong.`
              : "This badge doesn't exist."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16 bg-[#08090d]">
      <div className="w-full max-w-xl rounded-2xl border border-[#1c2030] bg-[#0e1018] p-8 sm:p-10 text-[#eef1f8] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
        <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#00e5ff]">
          Verified Credential · AlgoVerse
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-6">
          <BadgePlate tier={badge.tier} earned value={plateValue(badge)} size={140} />
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <span
              className="inline-block self-center sm:self-start font-mono text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border"
              style={{ borderColor: "currentColor" }}
            >
              {badge.tierLabel}
            </span>
            <h1 className="font-bold text-3xl tracking-wide">{badge.name}</h1>
            <p className="text-sm text-[#8b93a8] max-w-sm">{badge.description}</p>
          </div>
        </div>

        <CertificateActions
          badgeId={badge.id}
          username={cert.username}
          earnedName={cert.display_name || cert.username}
          earnedAt={cert.earned_at}
          siteUrl={siteUrl}
        />
      </div>
    </div>
  );
}
