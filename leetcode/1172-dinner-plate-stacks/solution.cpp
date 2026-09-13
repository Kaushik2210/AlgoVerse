#include <vector>
#include <queue>
using namespace std;

class DinnerPlates {
private:
    int capacity;
    vector<vector<int>> stacks;
    // Min-heap of stack indices that MIGHT have room to push into.
    // Entries can go stale (index removed / stack filled up since being
    // added) -- they're just skipped lazily whenever they surface.
    priority_queue<int, vector<int>, greater<int>> available;

public:
    DinnerPlates(int capacity) : capacity(capacity) {}

    void push(int val) {
        while (!available.empty() &&
               (available.top() >= (int)stacks.size() ||
                (int)stacks[available.top()].size() >= capacity)) {
            available.pop();
        }

        int index;
        if (available.empty()) {
            index = stacks.size();
            stacks.push_back({});
        } else {
            index = available.top();
        }

        stacks[index].push_back(val);

        if ((int)stacks[index].size() < capacity) {
            available.push(index);
        }
    }

    int pop() {
        while (!stacks.empty() && stacks.back().empty()) {
            stacks.pop_back();
        }

        if (stacks.empty()) {
            return -1;
        }

        return popAtStack(stacks.size() - 1);
    }

    int popAtStack(int index) {
        if (index >= (int)stacks.size() || stacks[index].empty()) {
            return -1;
        }

        int val = stacks[index].back();
        stacks[index].pop_back();
        available.push(index);
        return val;
    }
};

/**
 * Your DinnerPlates object will be instantiated and called as such:
 * DinnerPlates* obj = new DinnerPlates(capacity);
 * obj->push(val);
 * int param_2 = obj->pop();
 * int param_3 = obj->popAtStack(index);
 */
