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
    ListNode* partition(ListNode* head, int x) {
        ListNode lessDummy;
        ListNode greaterDummy;
        ListNode* lessTail = &lessDummy;
        ListNode* greaterTail = &greaterDummy;

        ListNode* node = head;
        while (node) {
            if (node->val < x) {
                lessTail->next = node;
                lessTail = lessTail->next;
            } else {
                greaterTail->next = node;
                greaterTail = greaterTail->next;
            }
            node = node->next;
        }

        greaterTail->next = nullptr;
        lessTail->next = greaterDummy.next;

        return lessDummy.next;
    }
};
