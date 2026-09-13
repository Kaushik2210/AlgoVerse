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
    public ListNode reverseEvenLengthGroups(ListNode head) {
        ListNode prev = head;
        int groupLen = 2;
        ListNode groupStart = head.next;

        while (groupStart != null) {
            int count = 0;
            ListNode node = groupStart;
            while (node != null && count < groupLen) {
                node = node.next;
                count++;
            }
            ListNode groupEnd = node;

            if (count % 2 == 0) {
                ListNode reversePrev = groupEnd;
                ListNode curr = groupStart;
                for (int i = 0; i < count; i++) {
                    ListNode nextNode = curr.next;
                    curr.next = reversePrev;
                    reversePrev = curr;
                    curr = nextNode;
                }
                prev.next = reversePrev;
                prev = groupStart;
            } else {
                ListNode curr = groupStart;
                for (int i = 0; i < count - 1; i++) {
                    curr = curr.next;
                }
                prev = curr;
            }

            groupStart = groupEnd;
            groupLen++;
        }

        return head;
    }
}
