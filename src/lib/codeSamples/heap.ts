import type { CodeSamples } from "./types";
import { HEAP_CODE } from "@/lib/algorithms/heap";

export const HEAP_CODE_SAMPLES: Record<string, CodeSamples> = {
  insert: {
    js: HEAP_CODE.insert,
    python: `def insert(heap: list[int], value: int, kind: str) -> list[int]:
    heap.append(value)
    i = len(heap) - 1
    while i > 0:
        p = (i - 1) // 2
        if better(kind, heap[i], heap[p]):
            heap[i], heap[p] = heap[p], heap[i]
            i = p
        else:
            break
    return heap`,
    java: `import java.util.List;

public class Solution {
    public static List<Integer> insert(List<Integer> heap, int value, String kind) {
        heap.add(value);
        int i = heap.size() - 1;
        while (i > 0) {
            int p = (i - 1) / 2;
            if (better(kind, heap.get(i), heap.get(p))) {
                java.util.Collections.swap(heap, i, p);
                i = p;
            } else break;
        }
        return heap;
    }
}`,
    cpp: `#include <vector>
using namespace std;

vector<int>& insert(vector<int>& heap, int value, const string& kind) {
    heap.push_back(value);
    int i = (int)heap.size() - 1;
    while (i > 0) {
        int p = (i - 1) / 2;
        if (better(kind, heap[i], heap[p])) {
            swap(heap[i], heap[p]);
            i = p;
        } else break;
    }
    return heap;
}`,
  },
  extract: {
    js: HEAP_CODE.extract,
    python: `def extract_root(heap: list[int], kind: str) -> int:
    root = heap[0]
    last = heap.pop()
    if not heap:
        return root
    heap[0] = last

    i = 0
    while True:
        l, r = 2 * i + 1, 2 * i + 2
        best = i
        if l < len(heap) and better(kind, heap[l], heap[best]):
            best = l
        if r < len(heap) and better(kind, heap[r], heap[best]):
            best = r
        if best == i:
            break
        heap[i], heap[best] = heap[best], heap[i]
        i = best
    return root`,
    java: `import java.util.List;

public class Solution {
    public static int extractRoot(List<Integer> heap, String kind) {
        int root = heap.get(0);
        int last = heap.remove(heap.size() - 1);
        if (heap.isEmpty()) return root;
        heap.set(0, last);

        int i = 0;
        while (true) {
            int l = 2 * i + 1, r = 2 * i + 2;
            int best = i;
            if (l < heap.size() && better(kind, heap.get(l), heap.get(best))) best = l;
            if (r < heap.size() && better(kind, heap.get(r), heap.get(best))) best = r;
            if (best == i) break;
            java.util.Collections.swap(heap, i, best);
            i = best;
        }
        return root;
    }
}`,
    cpp: `#include <vector>
using namespace std;

int extractRoot(vector<int>& heap, const string& kind) {
    int root = heap[0];
    int last = heap.back();
    heap.pop_back();
    if (heap.empty()) return root;
    heap[0] = last;

    int i = 0;
    while (true) {
        int l = 2 * i + 1, r = 2 * i + 2;
        int best = i;
        if (l < (int)heap.size() && better(kind, heap[l], heap[best])) best = l;
        if (r < (int)heap.size() && better(kind, heap[r], heap[best])) best = r;
        if (best == i) break;
        swap(heap[i], heap[best]);
        i = best;
    }
    return root;
}`,
  },
};
