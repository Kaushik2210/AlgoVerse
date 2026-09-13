#include <cstdlib>
#include <vector>
using namespace std;

class Skiplist {
    static const int MAX_LEVEL = 16;

    struct Node {
        int val;
        vector<Node*> forward;
        Node(int v, int level) : val(v), forward(level + 1, nullptr) {}
    };

    Node* head;
    int level;

    int randomLevel() {
        int lvl = 0;
        while ((double)rand() / RAND_MAX < 0.5 && lvl < MAX_LEVEL) {
            lvl++;
        }
        return lvl;
    }

    vector<Node*> findPredecessors(int target) {
        vector<Node*> update(MAX_LEVEL + 1, head);
        Node* cur = head;
        for (int i = level; i >= 0; i--) {
            while (cur->forward[i] && cur->forward[i]->val < target) {
                cur = cur->forward[i];
            }
            update[i] = cur;
        }
        return update;
    }

public:
    Skiplist() {
        head = new Node(-1, MAX_LEVEL);
        level = 0;
    }

    bool search(int target) {
        vector<Node*> update = findPredecessors(target);
        Node* candidate = update[0]->forward[0];
        return candidate != nullptr && candidate->val == target;
    }

    void add(int num) {
        vector<Node*> update = findPredecessors(num);
        int newLevel = randomLevel();
        if (newLevel > level) {
            for (int i = level + 1; i <= newLevel; i++) {
                update[i] = head;
            }
            level = newLevel;
        }
        Node* newNode = new Node(num, newLevel);
        for (int i = 0; i <= newLevel; i++) {
            newNode->forward[i] = update[i]->forward[i];
            update[i]->forward[i] = newNode;
        }
    }

    bool erase(int num) {
        vector<Node*> update = findPredecessors(num);
        Node* candidate = update[0]->forward[0];
        if (candidate == nullptr || candidate->val != num) {
            return false;
        }
        for (int i = 0; i <= level; i++) {
            if (update[i]->forward[i] != candidate) break;
            update[i]->forward[i] = candidate->forward[i];
        }
        while (level > 0 && head->forward[level] == nullptr) {
            level--;
        }
        delete candidate;
        return true;
    }
};

/**
 * Your Skiplist object will be instantiated and called as such:
 * Skiplist* obj = new Skiplist();
 * bool param_1 = obj->search(target);
 * obj->add(num);
 * bool param_3 = obj->erase(num);
 */
