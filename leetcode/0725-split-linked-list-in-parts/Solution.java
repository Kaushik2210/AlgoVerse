/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode[] splitListToParts(ListNode head, int k) {
        int length = 0;
        for (ListNode node = head; node != null; node = node.next) {
            length++;
        }

        int baseSize = length / k;
        int extra = length % k;

        ListNode[] result = new ListNode[k];
        ListNode curr = head;
        for (int i = 0; i < k; i++) {
            int partSize = baseSize + (i < extra ? 1 : 0);
            if (partSize == 0) {
                result[i] = null;
                continue;
            }

            ListNode partHead = curr;
            for (int j = 0; j < partSize - 1; j++) {
                curr = curr.next;
            }
            ListNode nextPart = curr.next;
            curr.next = null;
            curr = nextPart;
            result[i] = partHead;
        }

        return result;
    }
}
