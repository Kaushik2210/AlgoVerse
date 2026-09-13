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
    public ListNode deleteNodes(ListNode head, int m, int n) {
        ListNode curr = head;

        while (curr != null) {
            for (int i = 0; i < m - 1 && curr != null; i++) {
                curr = curr.next;
            }
            if (curr == null) {
                return head;
            }

            ListNode toDelete = curr.next;
            for (int i = 0; i < n && toDelete != null; i++) {
                toDelete = toDelete.next;
            }
            curr.next = toDelete;
            curr = toDelete;
        }

        return head;
    }
}
