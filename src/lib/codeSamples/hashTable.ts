import type { CodeSamples } from "./types";
import { HASH_TABLE_CODE } from "@/lib/algorithms/hashTable";

export const HASH_TABLE_CODE_SAMPLES: Record<string, CodeSamples> = {
  insert: {
    js: HASH_TABLE_CODE.insert,
    python: `def insert(table: "HashTable", key: str) -> None:
    idx = hash_fn(key) % table.num_buckets
    chain = table.buckets[idx]  # collisions live here

    if any(entry.key == key for entry in chain):
        return  # update, no growth

    chain.append(Entry(key))
    table.size += 1

    if table.size / table.num_buckets > 0.75:
        resize(table)  # double buckets, rehash every key`,
    java: `public class Solution {
    public static void insert(HashTable table, String key) {
        int idx = Math.floorMod(hash(key), table.numBuckets);
        List<Entry> chain = table.buckets[idx]; // collisions live here

        if (chain.stream().anyMatch(e -> e.key.equals(key))) return; // update, no growth

        chain.add(new Entry(key));
        table.size++;

        if ((double) table.size / table.numBuckets > 0.75) {
            resize(table); // double buckets, rehash every key
        }
    }
}`,
    cpp: `void insert(HashTable& table, const string& key) {
    int idx = hashFn(key) % table.numBuckets;
    auto& chain = table.buckets[idx]; // collisions live here

    for (auto& entry : chain) {
        if (entry.key == key) return; // update, no growth
    }

    chain.push_back({key});
    table.size++;

    if ((double)table.size / table.numBuckets > 0.75) {
        resize(table); // double buckets, rehash every key
    }
}`,
  },
  lookup: {
    js: HASH_TABLE_CODE.lookup,
    python: `def lookup(table: "HashTable", key: str) -> "Entry | None":
    idx = hash_fn(key) % table.num_buckets
    chain = table.buckets[idx]
    for entry in chain:
        if entry.key == key:
            return entry
    return None  # walked the whole chain, not found`,
    java: `public class Solution {
    public static Entry lookup(HashTable table, String key) {
        int idx = Math.floorMod(hash(key), table.numBuckets);
        for (Entry entry : table.buckets[idx]) {
            if (entry.key.equals(key)) return entry;
        }
        return null; // walked the whole chain, not found
    }
}`,
    cpp: `optional<Entry> lookup(HashTable& table, const string& key) {
    int idx = hashFn(key) % table.numBuckets;
    for (auto& entry : table.buckets[idx]) {
        if (entry.key == key) return entry;
    }
    return nullopt; // walked the whole chain, not found
}`,
  },
};
