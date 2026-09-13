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
    ListNode* deleteNodes(ListNode* head, int m, int n) {
        ListNode* curr = head;

        while (curr) {
            for (int i = 0; i < m - 1 && curr; i++) {
                curr = curr->next;
            }
            if (!curr) {
                return head;
            }

            ListNode* toDelete = curr->next;
            for (int i = 0; i < n && toDelete; i++) {
                toDelete = toDelete->next;
            }
            curr->next = toDelete;
            curr = toDelete;
        }

        return head;
    }
};
