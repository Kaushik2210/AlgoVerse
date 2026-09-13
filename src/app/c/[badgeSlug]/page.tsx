import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BadgePlate from "@/components/badges/BadgePlate";
import CertificateActions from "@/components/badges/CertificateActions";
import { badgeById, plateValue } from "@/lib/badges";
import { getSiteUrl } from "@/lib/site";

interface PageProps {
  params: Promise<{ badgeSlug: string }>;
  searchParams: Promise<{ name?: string; date?: string }>;
}

function ogImageUrl(badgeSlug: string, name?: string, date?: string) {
  const url = new URL("/api/og/badge", getSiteUrl());
  url.searchParams.set("slug", badgeSlug);
  if (name) url.searchParams.set("name", name);
  if (date) url.searchParams.set("date", date);
  return url.toString();
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { badgeSlug } = await params;
  const { name, date } = await searchParams;
  const badge = badgeById(badgeSlug);
  if (!badge) return { title: "Badge not found — AlgoVerse" };

  const title = `${badge.name} — AlgoVerse Achievement`;
  const description = `${badge.tierLabel} · ${badge.description}`;
  const image = ogImageUrl(badgeSlug, name, date);
  const pageUrl = new URL(`/c/${badgeSlug}`, getSiteUrl());
  if (name) pageUrl.searchParams.set("name", name);
  if (date) pageUrl.searchParams.set("date", date);

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

export default async function CertificatePage({ params, searchParams }: PageProps) {
  const { badgeSlug } = await params;
  const { name, date } = await searchParams;
  const badge = badgeById(badgeSlug);
  if (!badge) notFound();

  const siteUrl = getSiteUrl();

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
          siteUrl={siteUrl}
          initialName={name ?? null}
          initialDate={date ?? null}
        />
      </div>
    </div>
  );
}
