import type { CodeSamples } from "./types";
import { BLOOM_FILTER_CODE } from "@/lib/algorithms/bloomFilter";

export const BLOOM_FILTER_CODE_SAMPLES: Record<string, CodeSamples> = {
  insert: {
    js: BLOOM_FILTER_CODE.insert,
    python: `def insert(bits: list[int], item, hash_fns) -> None:
    for h in hash_fns:
        bits[h(item) % len(bits)] = 1  # set every hash's bit`,
    java: `public class Solution {
    public static void insert(int[] bits, String item, List<HashFn> hashFns) {
        for (HashFn h : hashFns) {
            bits[h.apply(item) % bits.length] = 1; // set every hash's bit
        }
    }
}`,
    cpp: `void insert(vector<int>& bits, const string& item, const vector<HashFn>& hashFns) {
    for (const auto& h : hashFns) {
        bits[h(item) % bits.size()] = 1; // set every hash's bit
    }
}`,
  },
  lookup: {
    js: BLOOM_FILTER_CODE.lookup,
    python: `def might_contain(bits: list[int], item, hash_fns) -> bool:
    for h in hash_fns:
        if not bits[h(item) % len(bits)]:
            return False  # definitely not a member
    return True  # possibly a member — could be a false positive`,
    java: `public class Solution {
    public static boolean mightContain(int[] bits, String item, List<HashFn> hashFns) {
        for (HashFn h : hashFns) {
            if (bits[h.apply(item) % bits.length] == 0) return false; // definitely not a member
        }
        return true; // possibly a member — could be a false positive
    }
}`,
    cpp: `bool mightContain(vector<int>& bits, const string& item, const vector<HashFn>& hashFns) {
    for (const auto& h : hashFns) {
        if (!bits[h(item) % bits.size()]) return false; // definitely not a member
    }
    return true; // possibly a member — could be a false positive
}`,
  },
};
