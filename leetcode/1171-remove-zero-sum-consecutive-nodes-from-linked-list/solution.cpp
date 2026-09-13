#include <unordered_map>
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
    ListNode* removeZeroSumSublists(ListNode* head) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;

        unordered_map<int, ListNode*> lastSeen;
        int prefixSum = 0;
        lastSeen[0] = dummy;
        for (ListNode* node = head; node; node = node->next) {
            prefixSum += node->val;
            lastSeen[prefixSum] = node;
        }

        prefixSum = 0;
        ListNode* node = dummy;
        while (node) {
            prefixSum += node->val;
            node->next = lastSeen[prefixSum]->next;
            node = node->next;
        }

        return dummy->next;
    }
};
