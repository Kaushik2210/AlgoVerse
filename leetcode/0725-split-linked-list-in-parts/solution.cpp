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
    vector<ListNode*> splitListToParts(ListNode* head, int k) {
        int length = 0;
        for (ListNode* node = head; node; node = node->next) {
            length++;
        }

        int baseSize = length / k;
        int extra = length % k;

        vector<ListNode*> result(k, nullptr);
        ListNode* curr = head;
        for (int i = 0; i < k; i++) {
            int partSize = baseSize + (i < extra ? 1 : 0);
            if (partSize == 0) {
                continue;
            }

            ListNode* partHead = curr;
            for (int j = 0; j < partSize - 1; j++) {
                curr = curr->next;
            }
            ListNode* nextPart = curr->next;
            curr->next = nullptr;
            curr = nextPart;
            result[i] = partHead;
        }

        return result;
    }
};
