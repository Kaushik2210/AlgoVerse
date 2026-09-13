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
    ListNode* reverseEvenLengthGroups(ListNode* head) {
        ListNode* prev = head;
        int groupLen = 2;
        ListNode* groupStart = head->next;

        while (groupStart) {
            int count = 0;
            ListNode* node = groupStart;
            while (node && count < groupLen) {
                node = node->next;
                count++;
            }
            ListNode* groupEnd = node;

            if (count % 2 == 0) {
                ListNode* reversePrev = groupEnd;
                ListNode* curr = groupStart;
                for (int i = 0; i < count; i++) {
                    ListNode* nextNode = curr->next;
                    curr->next = reversePrev;
                    reversePrev = curr;
                    curr = nextNode;
                }
                prev->next = reversePrev;
                prev = groupStart;
            } else {
                ListNode* curr = groupStart;
                for (int i = 0; i < count - 1; i++) {
                    curr = curr->next;
                }
                prev = curr;
            }

            groupStart = groupEnd;
            groupLen++;
        }

        return head;
    }
};
