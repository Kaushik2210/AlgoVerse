import type { CodeSamples } from "./types";
import { LRU_CACHE_CODE } from "@/lib/algorithms/lruCache";

export const LRU_CACHE_CODE_SAMPLES: Record<string, CodeSamples> = {
  ops: {
    js: LRU_CACHE_CODE.ops,
    python: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.map: dict = {}
        self.list = DoublyLinkedList()

    def get(self, key):  # O(1)
        if key not in self.map:
            return -1  # miss
        node = self.map[key]
        self.list.move_to_front(node)  # mark as most recently used
        return node.value

    def put(self, key, value) -> None:  # O(1)
        if key in self.map:
            node = self.map[key]
            node.value = value
            self.list.move_to_front(node)
            return
        if self.list.size >= self.capacity:
            lru = self.list.remove_back()  # evict least recently used
            del self.map[lru.key]
        node = self.list.push_front(key, value)
        self.map[key] = node`,
    java: `public class LRUCache {
    private final int capacity;
    private final Map<Integer, Node> map = new HashMap<>();
    private final DoublyLinkedList list = new DoublyLinkedList();

    public LRUCache(int capacity) { this.capacity = capacity; }

    public int get(int key) { // O(1)
        if (!map.containsKey(key)) return -1; // miss
        Node node = map.get(key);
        list.moveToFront(node); // mark as most recently used
        return node.value;
    }

    public void put(int key, int value) { // O(1)
        if (map.containsKey(key)) {
            Node node = map.get(key);
            node.value = value;
            list.moveToFront(node);
            return;
        }
        if (list.size >= capacity) {
            Node lru = list.removeBack(); // evict least recently used
            map.remove(lru.key);
        }
        Node node = list.pushFront(key, value);
        map.put(key, node);
    }
}`,
    cpp: `class LRUCache {
    int capacity;
    unordered_map<int, Node*> map;
    DoublyLinkedList list;

public:
    LRUCache(int capacity) : capacity(capacity) {}

    int get(int key) { // O(1)
        if (!map.count(key)) return -1; // miss
        Node* node = map[key];
        list.moveToFront(node); // mark as most recently used
        return node->value;
    }

    void put(int key, int value) { // O(1)
        if (map.count(key)) {
            Node* node = map[key];
            node->value = value;
            list.moveToFront(node);
            return;
        }
        if (list.size >= capacity) {
            Node* lru = list.removeBack(); // evict least recently used
            map.erase(lru->key);
        }
        Node* node = list.pushFront(key, value);
        map[key] = node;
    }
};`,
  },
};
