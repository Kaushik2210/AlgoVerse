"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Download, Share2, BadgePlus } from "lucide-react";
import { badgeById } from "@/lib/badges";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

interface Props {
  badgeId: string;
  /** The certificate owner's real username, as resolved server-side from
   * the public.certificate_badges view — never trusted from a URL param. */
  username: string;
  /** Display name to show on the certificate (profiles.display_name, or
   * the username if none is set). */
  earnedName: string;
  /** ISO date/timestamp the badge was actually earned, per the database. */
  earnedAt: string;
  siteUrl: string;
}

/**
 * Share controls for a certificate page. Every value here is already
 * database-verified by the server component that renders this (see
 * src/app/c/[username]/[badgeId]/page.tsx) — this component only builds
 * share links/images from it, it never reads local progress or URL query
 * params for identity.
 */
export default function CertificateActions({ badgeId, username, earnedName, earnedAt, siteUrl }: Props) {
  const badge = badgeById(badgeId);
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(
    () => new URL(`/c/${username}/${badgeId}`, siteUrl).toString(),
    [username, badgeId, siteUrl]
  );

  const ogImage = useMemo(() => {
    const url = new URL("/api/og/badge", siteUrl);
    url.searchParams.set("username", username);
    url.searchParams.set("badgeId", badgeId);
    return url.toString();
  }, [username, badgeId, siteUrl]);

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const issueDate = new Date(earnedAt);
  const addToProfileUrl = badge
    ? `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
        `${badge.name} — AlgoVerse`
      )}&organizationName=${encodeURIComponent("AlgoVerse")}&issueYear=${issueDate.getFullYear()}&issueMonth=${
        issueDate.getMonth() + 1
      }&certUrl=${encodeURIComponent(shareUrl)}&certId=${encodeURIComponent(badgeId)}`
    : "#";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — no-op, the
      // link is still visible/selectable below.
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-4 border-t border-[#1c2030] pt-6">
      <p className="text-xs text-[#8b93a8]">
        Issued to <span className="text-[#eef1f8] font-medium">{earnedName}</span> ·{" "}
        {formatDate(earnedAt)}
      </p>

      <div className="flex flex-wrap gap-2">
        <a
          href={linkedInShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-[#0a66c2] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#0958a8] transition-colors"
        >
          <Share2 size={14} /> Share on LinkedIn
        </a>
        <a
          href={addToProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-[#1c2030] px-3.5 py-2 text-xs font-semibold text-[#eef1f8] hover:border-[#00e5ff]/50 transition-colors"
        >
          <BadgePlus size={14} /> Add to LinkedIn Profile
        </a>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-2 rounded-lg border border-[#1c2030] px-3.5 py-2 text-xs font-semibold text-[#eef1f8] hover:border-[#00e5ff]/50 transition-colors"
        >
          {copied ? <Check size={14} className="text-[#00e5ff]" /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy link"}
        </button>
        <a
          href={ogImage}
          download={`${badgeId}.png`}
          className="inline-flex items-center gap-2 rounded-lg border border-[#1c2030] px-3.5 py-2 text-xs font-semibold text-[#eef1f8] hover:border-[#00e5ff]/50 transition-colors"
        >
          <Download size={14} /> Download PNG
        </a>
      </div>

      <p className="text-[10px] text-[#5b6274] break-all">{shareUrl}</p>
    </div>
  );
}
