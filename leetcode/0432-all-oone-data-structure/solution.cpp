#include <string>
#include <unordered_map>
#include <unordered_set>
using namespace std;

class AllOne {
    struct Node {
        int count;
        unordered_set<string> keys;
        Node* prev = nullptr;
        Node* next = nullptr;
        Node(int c) : count(c) {}
    };

    Node* head;
    Node* tail;
    unordered_map<string, int> keyCount;
    unordered_map<string, Node*> keyNode;

    Node* insertAfter(Node* node, int count) {
        Node* newNode = new Node(count);
        newNode->prev = node;
        newNode->next = node->next;
        node->next->prev = newNode;
        node->next = newNode;
        return newNode;
    }

    Node* insertBefore(Node* node, int count) {
        Node* newNode = new Node(count);
        newNode->next = node;
        newNode->prev = node->prev;
        node->prev->next = newNode;
        node->prev = newNode;
        return newNode;
    }

    void remove(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
        delete node;
    }

public:
    AllOne() {
        head = new Node(0);
        tail = new Node(0);
        head->next = tail;
        tail->prev = head;
    }

    void inc(string key) {
        if (keyCount.find(key) == keyCount.end()) {
            keyCount[key] = 1;
            Node* node;
            if (head->next == tail || head->next->count != 1) {
                node = insertAfter(head, 1);
            } else {
                node = head->next;
            }
            node->keys.insert(key);
            keyNode[key] = node;
            return;
        }

        Node* curNode = keyNode[key];
        int newCount = keyCount[key] + 1;
        keyCount[key] = newCount;
        curNode->keys.erase(key);

        Node* newNode;
        if (curNode->next == tail || curNode->next->count != newCount) {
            newNode = insertAfter(curNode, newCount);
        } else {
            newNode = curNode->next;
        }
        newNode->keys.insert(key);
        keyNode[key] = newNode;

        if (curNode->keys.empty()) remove(curNode);
    }

    void dec(string key) {
        if (keyCount.find(key) == keyCount.end()) return;

        Node* curNode = keyNode[key];
        int curCount = keyCount[key];
        curNode->keys.erase(key);

        if (curCount == 1) {
            keyCount.erase(key);
            keyNode.erase(key);
        } else {
            int newCount = curCount - 1;
            keyCount[key] = newCount;
            Node* newNode;
            if (curNode->prev == head || curNode->prev->count != newCount) {
                newNode = insertBefore(curNode, newCount);
            } else {
                newNode = curNode->prev;
            }
            newNode->keys.insert(key);
            keyNode[key] = newNode;
        }

        if (curNode->keys.empty()) remove(curNode);
    }

    string getMaxKey() {
        if (tail->prev == head) return "";
        return *tail->prev->keys.begin();
    }

    string getMinKey() {
        if (head->next == tail) return "";
        return *head->next->keys.begin();
    }
};

/**
 * Your AllOne object will be instantiated and called as such:
 * AllOne* obj = new AllOne();
 * obj->inc(key);
 * obj->dec(key);
 * string param_3 = obj->getMaxKey();
 * string param_4 = obj->getMinKey();
 */
