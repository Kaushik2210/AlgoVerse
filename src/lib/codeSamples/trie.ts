import type { CodeSamples } from "./types";
import { TRIE_CODE } from "@/lib/algorithms/trie";

export const TRIE_CODE_SAMPLES: Record<string, CodeSamples> = {
  insert: {
    js: TRIE_CODE.insert,
    python: `class TrieNode:
    def __init__(self):
        self.children: dict[str, "TrieNode"] = {}
        self.is_end = False

def insert(root: TrieNode, word: str) -> None:
    node = root
    for c in word:
        if c not in node.children:
            node.children[c] = TrieNode()
        node = node.children[c]
    node.is_end = True`,
    java: `import java.util.HashMap;
import java.util.Map;

class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEnd = false;
}

public class Solution {
    public static void insert(TrieNode root, String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, new TrieNode());
            node = node.children.get(c);
        }
        node.isEnd = true;
    }
}`,
    cpp: `#include <unordered_map>
#include <string>
using namespace std;

struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isEnd = false;
};

void insert(TrieNode* root, const string& word) {
    TrieNode* node = root;
    for (char c : word) {
        if (!node->children.count(c)) {
            node->children[c] = new TrieNode();
        }
        node = node->children[c];
    }
    node->isEnd = true;
}`,
  },
  search: {
    js: TRIE_CODE.search,
    python: `def search(root: TrieNode, word: str) -> bool:
    node = root
    for c in word:
        if c not in node.children:
            return False
        node = node.children[c]
    return node.is_end`,
    java: `public class Solution {
    public static boolean search(TrieNode root, String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (!node.children.containsKey(c)) return false;
            node = node.children.get(c);
        }
        return node.isEnd;
    }
}`,
    cpp: `bool search(TrieNode* root, const string& word) {
    TrieNode* node = root;
    for (char c : word) {
        if (!node->children.count(c)) return false;
        node = node->children[c];
    }
    return node->isEnd;
}`,
  },
};
