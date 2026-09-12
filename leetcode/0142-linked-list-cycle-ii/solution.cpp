// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode* slow = head;
        ListNode* fast = head;

        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                ListNode* pointer = head;
                while (pointer != slow) {
                    pointer = pointer->next;
                    slow = slow->next;
                }
                return pointer;
            }
        }

        return nullptr;
    }
};
