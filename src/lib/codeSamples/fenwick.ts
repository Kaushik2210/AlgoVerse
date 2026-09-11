import type { CodeSamples } from "./types";
import { FENWICK_TREE_CODE } from "@/lib/algorithms/fenwickTree";

export const FENWICK_TREE_CODE_SAMPLES: Record<string, CodeSamples> = {
  build: {
    js: FENWICK_TREE_CODE.build,
    python: `def build(array: list[int]) -> list[int]:
    n = len(array)
    tree = [0] * (n + 1)
    for i in range(n):
        update(tree, i, array[i])
    return tree`,
    java: `public class Solution {
    public static int[] build(int[] array) {
        int n = array.length;
        int[] tree = new int[n + 1];
        for (int i = 0; i < n; i++) update(tree, i, array[i]);
        return tree;
    }
}`,
    cpp: `#include <vector>
using namespace std;

vector<int> build(vector<int>& array) {
    int n = (int)array.size();
    vector<int> tree(n + 1, 0);
    for (int i = 0; i < n; i++) update(tree, i, array[i]);
    return tree;
}`,
  },
  query: {
    js: FENWICK_TREE_CODE.query,
    python: `def prefix_sum(tree: list[int], n: int) -> int:
    total = 0
    i = n
    while i > 0:
        total += tree[i]
        i -= i & -i  # i & -i is lowbit(i)
    return total`,
    java: `public class Solution {
    public static int prefixSum(int[] tree, int n) {
        int sum = 0;
        for (int i = n; i > 0; i -= i & -i) { // i & -i is lowbit(i)
            sum += tree[i];
        }
        return sum;
    }
}`,
    cpp: `int prefixSum(vector<int>& tree, int n) {
    int sum = 0;
    for (int i = n; i > 0; i -= i & -i) { // i & -i is lowbit(i)
        sum += tree[i];
    }
    return sum;
}`,
  },
  update: {
    js: FENWICK_TREE_CODE.update,
    python: `def update(tree: list[int], index: int, delta: int) -> None:
    i = index + 1
    while i < len(tree):
        tree[i] += delta
        i += i & -i`,
    java: `public class Solution {
    public static void update(int[] tree, int index, int delta) {
        for (int i = index + 1; i < tree.length; i += i & -i) {
            tree[i] += delta;
        }
    }
}`,
    cpp: `void update(vector<int>& tree, int index, int delta) {
    for (int i = index + 1; i < (int)tree.size(); i += i & -i) {
        tree[i] += delta;
    }
}`,
  },
};
