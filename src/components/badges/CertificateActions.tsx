"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Download, Share2, BadgePlus } from "lucide-react";
import { useProgressStore } from "@/lib/store/progress";
import { useAuthStore } from "@/lib/store/auth";
import { useBadgeEarnedAt } from "@/lib/store/selectors";
import { badgeById } from "@/lib/badges";
import { useMounted } from "@/lib/hooks/useMounted";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

interface Props {
  badgeId: string;
  siteUrl: string;
  initialName: string | null;
  initialDate: string | null;
}

/**
 * Client-side share controls for a certificate page. This site has no
 * server-side user profiles for anonymous visitors to read, so a
 * certificate's "name"/"date earned" are carried entirely in the URL's
 * query string — this component fills those in from the *local* browser's
 * progress store when the visitor is the badge's actual owner (i.e. it's
 * one of their own earnedBadgeIds), and lets them copy a link/PNG that
 * bakes those values in for anyone else who opens it.
 */
export default function CertificateActions({ badgeId, siteUrl, initialName, initialDate }: Props) {
  const mounted = useMounted();
  const earned = useProgressStore((s) => s.earnedBadgeIds.includes(badgeId));
  const earnedAt = useBadgeEarnedAt(badgeId);
  const user = useAuthStore((s) => s.user);
  const badge = badgeById(badgeId);

  const ownerDefaultName =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.name as string | undefined) ||
    user?.email?.split("@")[0] ||
    "AlgoVerse User";

  const [name, setName] = useState(initialName ?? "");
  const [copied, setCopied] = useState(false);

  const isOwner = mounted && earned && !initialName;
  const effectiveName = initialName ?? (name || (isOwner ? ownerDefaultName : "AlgoVerse User"));
  const effectiveDate = initialDate ?? earnedAt ?? todayISO();

  const shareUrl = useMemo(() => {
    const url = new URL(`/c/${badgeId}`, siteUrl);
    if (effectiveName) url.searchParams.set("name", effectiveName);
    if (effectiveDate) url.searchParams.set("date", effectiveDate);
    return url.toString();
  }, [badgeId, siteUrl, effectiveName, effectiveDate]);

  const ogImage = useMemo(() => {
    const url = new URL("/api/og/badge", siteUrl);
    url.searchParams.set("slug", badgeId);
    if (effectiveName) url.searchParams.set("name", effectiveName);
    if (effectiveDate) url.searchParams.set("date", effectiveDate);
    return url.toString();
  }, [badgeId, siteUrl, effectiveName, effectiveDate]);

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const issueDate = new Date(effectiveDate);
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
      // link is still visible/selectable in the input below.
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-4 border-t border-[#1c2030] pt-6">
      <p className="text-xs text-[#8b93a8]">
        Issued to <span className="text-[#eef1f8] font-medium">{effectiveName}</span> ·{" "}
        {formatDate(effectiveDate)}
      </p>

      {isOwner && (
        <label className="flex flex-col gap-1 text-xs text-[#8b93a8]">
          Name on certificate
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={ownerDefaultName}
            className="rounded-lg border border-[#1c2030] bg-[#08090d] px-3 py-2 text-sm text-[#eef1f8] outline-none focus:border-[#00e5ff]/60"
          />
        </label>
      )}

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
