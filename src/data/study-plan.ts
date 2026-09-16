/**
 * "Start Here" study plan — a hand-ordered subset of the existing /leetcode
 * catalog, grouped into the same pattern buckets a strong interview-prep
 * roadmap (à la NeetCode 150 / Blind 75) uses, in the order a learner should
 * tackle them: easier foundational patterns first, harder/compound ones
 * (graphs, DP, intervals) last.
 *
 * This is deliberately just curation, not new content — every slug below
 * must exist in leetcode/ (see scripts/generate-leetcode-index.mjs), so the
 * plan always links to a real, already-written solution writeup. No
 * difficulty or topic metadata is invented here: grouping is editorial
 * (which pattern each problem is chosen to teach), the same way the site's
 * existing /patterns pages already group problems by technique.
 */
export interface StudyPlanGroup {
  id: string;
  title: string;
  /** leetcode/ folder slugs, in the order to solve them. */
  slugs: string[];
}

export const STUDY_PLAN_TITLE = "75 Essential Problems";

export const STUDY_PLAN: StudyPlanGroup[] = [
  {
    id: "arrays-hashing",
    title: "Arrays & Hashing",
    slugs: [
      "0001-two-sum",
      "0217-contains-duplicate",
      "0238-product-of-array-except-self",
      "0053-maximum-subarray",
      "0049-group-anagrams",
      "0242-valid-anagram",
      "0128-longest-consecutive-sequence",
      "0347-top-k-frequent-elements",
      "0271-encode-and-decode-strings",
    ],
  },
  {
    id: "two-pointers",
    title: "Two Pointers",
    slugs: [
      "0011-container-with-most-water",
      "0015-3sum",
      "0125-valid-palindrome",
      "0042-trapping-rain-water",
    ],
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    slugs: [
      "0121-best-time-to-buy-and-sell-stock",
      "0003-longest-substring-without-repeating-characters",
      "0424-longest-repeating-character-replacement",
      "0076-minimum-window-substring",
      "0239-sliding-window-maximum",
    ],
  },
  {
    id: "stack",
    title: "Stack",
    slugs: [
      "0020-valid-parentheses",
      "0155-min-stack",
      "0150-evaluate-reverse-polish-notation",
      "0022-generate-parentheses",
      "0739-daily-temperatures",
    ],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    slugs: [
      "0153-find-minimum-in-rotated-sorted-array",
      "0033-search-in-rotated-sorted-array",
    ],
  },
  {
    id: "linked-list",
    title: "Linked List",
    slugs: [
      "0206-reverse-linked-list",
      "0021-merge-two-sorted-lists",
      "0143-reorder-list",
      "0019-remove-nth-node-from-end-of-list",
      "0141-linked-list-cycle",
      "0023-merge-k-sorted-lists",
    ],
  },
  {
    id: "trees",
    title: "Trees",
    slugs: [
      "0226-invert-binary-tree",
      "0104-maximum-depth-of-binary-tree",
      "0100-same-tree",
      "0098-validate-binary-search-tree",
      "0102-binary-tree-level-order-traversal",
      "0124-binary-tree-maximum-path-sum",
      "0297-serialize-and-deserialize-binary-tree",
    ],
  },
  {
    id: "tries",
    title: "Tries",
    slugs: [
      "0208-implement-trie-prefix-tree",
      "0211-design-add-and-search-words-data-structure",
      "0212-word-search-ii",
    ],
  },
  {
    id: "heap",
    title: "Heap / Priority Queue",
    slugs: ["0295-find-median-from-data-stream"],
  },
  {
    id: "backtracking",
    title: "Backtracking",
    slugs: [
      "0078-subsets",
      "0039-combination-sum",
      "0046-permutations",
      "0079-word-search",
    ],
  },
  {
    id: "graphs",
    title: "Graphs",
    slugs: [
      "0200-number-of-islands",
      "0133-clone-graph",
      "0207-course-schedule",
      "0417-pacific-atlantic-water-flow",
      "0261-graph-valid-tree",
      "0269-alien-dictionary",
    ],
  },
  {
    id: "dp-1d",
    title: "1-D Dynamic Programming",
    slugs: [
      "0070-climbing-stairs",
      "0198-house-robber",
      "0213-house-robber-ii",
      "0091-decode-ways",
      "0322-coin-change",
      "0139-word-break",
      "0300-longest-increasing-subsequence",
    ],
  },
  {
    id: "dp-2d",
    title: "2-D Dynamic Programming",
    slugs: ["0062-unique-paths", "1143-longest-common-subsequence"],
  },
  {
    id: "greedy",
    title: "Greedy",
    slugs: ["0055-jump-game"],
  },
  {
    id: "intervals",
    title: "Intervals",
    slugs: [
      "0057-insert-interval",
      "0056-merge-intervals",
      "0435-non-overlapping-intervals",
      "0252-meeting-rooms",
      "0253-meeting-rooms-ii",
    ],
  },
  {
    id: "bit-manipulation",
    title: "Math & Bit Manipulation",
    slugs: [
      "0371-sum-of-two-integers",
      "0191-number-of-1-bits",
      "0338-counting-bits",
      "0190-reverse-bits",
      "0268-missing-number",
    ],
  },
  {
    id: "matrix",
    title: "Matrix",
    slugs: ["0073-set-matrix-zeroes", "0054-spiral-matrix", "0048-rotate-image"],
  },
];

export const STUDY_PLAN_TOTAL = STUDY_PLAN.reduce((n, g) => n + g.slugs.length, 0);
