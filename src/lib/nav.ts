export interface NavItem {
  slug: string;
  title: string;
  href: string;
  category: "structure" | "pattern" | "page";
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    slug: "home",
    title: "Home",
    href: "/",
    category: "page",
    description: "Landing page",
  },
  {
    slug: "design-system",
    title: "Design System",
    href: "/design-system",
    category: "page",
    description: "UI component showcase",
  },
  {
    slug: "arrays",
    title: "Arrays & Sorting",
    href: "/dsa/arrays",
    category: "structure",
    description: "Bubble, insertion, merge, quick sort & binary search",
  },
  {
    slug: "linked-lists",
    title: "Linked Lists",
    href: "/dsa/linked-lists",
    category: "structure",
    description: "Singly linked list insert / delete / reverse / search",
  },
  {
    slug: "binary-search-trees",
    title: "Binary Search Trees",
    href: "/dsa/binary-search-trees",
    category: "structure",
    description: "BST insert, delete, search, traversals",
  },
  {
    slug: "stacks",
    title: "Stacks",
    href: "/dsa/stacks",
    category: "structure",
    description: "Push, pop, peek, and balanced parentheses via LIFO",
  },
  {
    slug: "queues",
    title: "Queues",
    href: "/dsa/queues",
    category: "structure",
    description: "Simple & circular queues with wraparound",
  },
  {
    slug: "hash-tables",
    title: "Hash Tables",
    href: "/dsa/hash-tables",
    category: "structure",
    description: "Hashing, chaining collisions, load factor & resize",
  },
  {
    slug: "two-pointers",
    title: "Two Pointers",
    href: "/patterns/two-pointers",
    category: "pattern",
    description: "Converging / diverging pointer techniques",
  },
  {
    slug: "sliding-window",
    title: "Sliding Window",
    href: "/patterns/sliding-window",
    category: "pattern",
    description: "Fixed & variable size window scanning",
  },
  {
    slug: "tree-bfs",
    title: "Tree BFS",
    href: "/patterns/tree-bfs",
    category: "pattern",
    description: "Level-order traversal pattern",
  },
  {
    slug: "fast-slow-pointers",
    title: "Fast & Slow Pointers",
    href: "/patterns/fast-slow-pointers",
    category: "pattern",
    description: "Cycle detection & finding the middle in one pass",
  },
  {
    slug: "monotonic-stack",
    title: "Monotonic Stack",
    href: "/patterns/monotonic-stack",
    category: "pattern",
    description: "Next greater/smaller element in O(n)",
  },
];

export const STRUCTURE_ITEMS = NAV_ITEMS.filter((i) => i.category === "structure");
export const PATTERN_ITEMS = NAV_ITEMS.filter((i) => i.category === "pattern");
