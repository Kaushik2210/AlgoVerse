#include <vector>
using namespace std;

// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    vector<int> nextLargerNodes(ListNode* head) {
        vector<int> values;
        for (ListNode* node = head; node; node = node->next) {
            values.push_back(node->val);
        }

        int n = values.size();
        vector<int> result(n, 0);
        vector<int> stack; // indices awaiting their next greater value

        for (int i = 0; i < n; i++) {
            while (!stack.empty() && values[stack.back()] < values[i]) {
                result[stack.back()] = values[i];
                stack.pop_back();
            }
            stack.push_back(i);
        }

        return result;
    }
};
