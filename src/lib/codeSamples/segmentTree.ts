import type { CodeSamples } from "./types";
import { SEGMENT_TREE_CODE } from "@/lib/algorithms/segmentTree";

export const SEGMENT_TREE_CODE_SAMPLES: Record<string, CodeSamples> = {
  build: {
    js: SEGMENT_TREE_CODE.build,
    python: `class SegNode:
    def __init__(self, lo, hi, total, left=None, right=None):
        self.lo, self.hi, self.sum = lo, hi, total
        self.left, self.right = left, right

def build(array: list[int], lo: int, hi: int) -> SegNode:
    if lo == hi:
        return SegNode(lo, hi, array[lo])
    mid = (lo + hi) // 2
    left = build(array, lo, mid)
    right = build(array, mid + 1, hi)
    return SegNode(lo, hi, left.sum + right.sum, left, right)`,
    java: `class SegNode {
    int lo, hi, sum;
    SegNode left, right;
    SegNode(int lo, int hi, int sum) { this.lo = lo; this.hi = hi; this.sum = sum; }
}

public class Solution {
    public static SegNode build(int[] array, int lo, int hi) {
        if (lo == hi) return new SegNode(lo, hi, array[lo]);
        int mid = (lo + hi) >> 1;
        SegNode left = build(array, lo, mid);
        SegNode right = build(array, mid + 1, hi);
        SegNode node = new SegNode(lo, hi, left.sum + right.sum);
        node.left = left;
        node.right = right;
        return node;
    }
}`,
    cpp: `struct SegNode {
    int lo, hi, sum;
    SegNode *left = nullptr, *right = nullptr;
    SegNode(int lo, int hi, int sum) : lo(lo), hi(hi), sum(sum) {}
};

SegNode* build(vector<int>& array, int lo, int hi) {
    if (lo == hi) return new SegNode(lo, hi, array[lo]);
    int mid = (lo + hi) >> 1;
    SegNode* left = build(array, lo, mid);
    SegNode* right = build(array, mid + 1, hi);
    SegNode* node = new SegNode(lo, hi, left->sum + right->sum);
    node->left = left;
    node->right = right;
    return node;
}`,
  },
  query: {
    js: SEGMENT_TREE_CODE.query,
    python: `def query(node: SegNode | None, left: int, right: int) -> int:
    if not node:
        return 0
    if node.hi < left or node.lo > right:
        return 0  # out of range — skip
    if node.lo >= left and node.hi <= right:
        return node.sum  # fully in range — take directly
    return query(node.left, left, right) + query(node.right, left, right)  # partial — recurse`,
    java: `public class Solution {
    public static int query(SegNode node, int left, int right) {
        if (node == null) return 0;
        if (node.hi < left || node.lo > right) return 0; // out of range — skip
        if (node.lo >= left && node.hi <= right) return node.sum; // fully in range — take directly
        return query(node.left, left, right) + query(node.right, left, right); // partial — recurse
    }
}`,
    cpp: `int query(SegNode* node, int left, int right) {
    if (!node) return 0;
    if (node->hi < left || node->lo > right) return 0; // out of range — skip
    if (node->lo >= left && node->hi <= right) return node->sum; // fully in range — take directly
    return query(node->left, left, right) + query(node->right, left, right); // partial — recurse
}`,
  },
  update: {
    js: SEGMENT_TREE_CODE.update,
    python: `def update(node: SegNode, index: int, value: int) -> None:
    if node.lo == node.hi:
        node.sum = value
        return
    if index <= node.left.hi:
        update(node.left, index, value)
    else:
        update(node.right, index, value)
    node.sum = node.left.sum + node.right.sum  # recompute on the way back up`,
    java: `public class Solution {
    public static void update(SegNode node, int index, int value) {
        if (node.lo == node.hi) { node.sum = value; return; }
        if (index <= node.left.hi) update(node.left, index, value);
        else update(node.right, index, value);
        node.sum = node.left.sum + node.right.sum; // recompute on the way back up
    }
}`,
    cpp: `void update(SegNode* node, int index, int value) {
    if (node->lo == node->hi) { node->sum = value; return; }
    if (index <= node->left->hi) update(node->left, index, value);
    else update(node->right, index, value);
    node->sum = node->left->sum + node->right->sum; // recompute on the way back up
}`,
  },
};
