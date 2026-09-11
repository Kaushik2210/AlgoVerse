import type { CodeSamples } from "./types";
import { SKIP_LIST_CODE } from "@/lib/algorithms/skipList";

export const SKIP_LIST_CODE_SAMPLES: Record<string, CodeSamples> = {
  build: {
    js: SKIP_LIST_CODE.build,
    python: `def insert(skip_list, value) -> None:
    height = random_height()  # coin flip per extra level
    node = Node(value, height)
    splice(skip_list, node)  # link in at every level 0..height-1`,
    java: `public class Solution {
    public static void insert(SkipList list, int value) {
        int height = randomHeight(); // coin flip per extra level
        Node node = new Node(value, height);
        splice(list, node); // link in at every level 0..height-1
    }
}`,
    cpp: `void insert(SkipList& list, int value) {
    int height = randomHeight(); // coin flip per extra level
    Node* node = new Node(value, height);
    splice(list, node); // link in at every level 0..height-1
}`,
  },
  search: {
    js: SKIP_LIST_CODE.search,
    python: `def search(skip_list, target):
    x = skip_list.head
    for level in range(skip_list.max_level - 1, -1, -1):
        while x.forward[level] and x.forward[level].value < target:
            x = x.forward[level]  # move right
        # otherwise: drop down a level, x stays put
    x = x.forward[0]
    return x if x and x.value == target else None`,
    java: `public class Solution {
    public static Node search(SkipList list, int target) {
        Node x = list.head;
        for (int level = list.maxLevel - 1; level >= 0; level--) {
            while (x.forward[level] != null && x.forward[level].value < target) {
                x = x.forward[level]; // move right
            }
            // otherwise: drop down a level, x stays put
        }
        x = x.forward[0];
        return (x != null && x.value == target) ? x : null;
    }
}`,
    cpp: `Node* search(SkipList& list, int target) {
    Node* x = list.head;
    for (int level = list.maxLevel - 1; level >= 0; level--) {
        while (x->forward[level] && x->forward[level]->value < target) {
            x = x->forward[level]; // move right
        }
        // otherwise: drop down a level, x stays put
    }
    x = x->forward[0];
    return (x && x->value == target) ? x : nullptr;
}`,
  },
  insert: {
    js: SKIP_LIST_CODE.insert,
    python: `def insert(skip_list, value) -> None:
    update = [None] * skip_list.max_level  # predecessor at each level
    x = skip_list.head
    for level in range(skip_list.max_level - 1, -1, -1):
        while x.forward[level] and x.forward[level].value < value:
            x = x.forward[level]
        update[level] = x

    height = random_height()
    node = Node(value, height)
    for level in range(height):
        node.forward[level] = update[level].forward[level]
        update[level].forward[level] = node`,
    java: `public class Solution {
    public static void insert(SkipList list, int value) {
        Node[] update = new Node[list.maxLevel]; // predecessor at each level
        Node x = list.head;
        for (int level = list.maxLevel - 1; level >= 0; level--) {
            while (x.forward[level] != null && x.forward[level].value < value) x = x.forward[level];
            update[level] = x;
        }

        int height = randomHeight();
        Node node = new Node(value, height);
        for (int level = 0; level < height; level++) {
            node.forward[level] = update[level].forward[level];
            update[level].forward[level] = node;
        }
    }
}`,
    cpp: `void insert(SkipList& list, int value) {
    vector<Node*> update(list.maxLevel); // predecessor at each level
    Node* x = list.head;
    for (int level = list.maxLevel - 1; level >= 0; level--) {
        while (x->forward[level] && x->forward[level]->value < value) x = x->forward[level];
        update[level] = x;
    }

    int height = randomHeight();
    Node* node = new Node(value, height);
    for (int level = 0; level < height; level++) {
        node->forward[level] = update[level]->forward[level];
        update[level]->forward[level] = node;
    }
}`,
  },
};
