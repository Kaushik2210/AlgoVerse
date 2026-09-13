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
    public ListNode swapNodes(ListNode head, int k) {
        ListNode first = head;
        for (int i = 0; i < k - 1; i++) {
            first = first.next;
        }

        ListNode second = head;
        ListNode runner = first;
        while (runner.next != null) {
            runner = runner.next;
            second = second.next;
        }

        int tmp = first.val;
        first.val = second.val;
        second.val = tmp;

        return head;
    }
}
