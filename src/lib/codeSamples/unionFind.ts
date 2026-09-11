import type { CodeSamples } from "./types";
import { UNION_FIND_CODE } from "@/lib/algorithms/unionFind";

export const UNION_FIND_CODE_SAMPLES: Record<string, CodeSamples> = {
  union: {
    js: UNION_FIND_CODE.union,
    python: `def union(parent: list[int], rank: list[int], a: int, b: int) -> None:
    ra = find(parent, a)
    rb = find(parent, b)
    if ra == rb:
        return  # already in the same set

    if rank[ra] < rank[rb]:
        parent[ra] = rb
    elif rank[ra] > rank[rb]:
        parent[rb] = ra
    else:
        parent[rb] = ra
        rank[ra] += 1`,
    java: `public class Solution {
    public static void union(int[] parent, int[] rank, int a, int b) {
        int ra = find(parent, a);
        int rb = find(parent, b);
        if (ra == rb) return; // already in the same set

        if (rank[ra] < rank[rb]) {
            parent[ra] = rb;
        } else if (rank[ra] > rank[rb]) {
            parent[rb] = ra;
        } else {
            parent[rb] = ra;
            rank[ra]++;
        }
    }
}`,
    cpp: `void unite(vector<int>& parent, vector<int>& rank, int a, int b) {
    int ra = find(parent, a);
    int rb = find(parent, b);
    if (ra == rb) return; // already in the same set

    if (rank[ra] < rank[rb]) {
        parent[ra] = rb;
    } else if (rank[ra] > rank[rb]) {
        parent[rb] = ra;
    } else {
        parent[rb] = ra;
        rank[ra]++;
    }
}`,
  },
  find: {
    js: UNION_FIND_CODE.find,
    python: `def find(parent: list[int], x: int) -> int:
    if parent[x] != x:
        parent[x] = find(parent, parent[x])  # path compression
    return parent[x]`,
    java: `public class Solution {
    public static int find(int[] parent, int x) {
        if (parent[x] != x) {
            parent[x] = find(parent, parent[x]); // path compression
        }
        return parent[x];
    }
}`,
    cpp: `int find(vector<int>& parent, int x) {
    if (parent[x] != x) {
        parent[x] = find(parent, parent[x]); // path compression
    }
    return parent[x];
}`,
  },
};
