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
    public ListNode partition(ListNode head, int x) {
        ListNode lessDummy = new ListNode();
        ListNode greaterDummy = new ListNode();
        ListNode lessTail = lessDummy;
        ListNode greaterTail = greaterDummy;

        ListNode node = head;
        while (node != null) {
            if (node.val < x) {
                lessTail.next = node;
                lessTail = lessTail.next;
            } else {
                greaterTail.next = node;
                greaterTail = greaterTail.next;
            }
            node = node.next;
        }

        greaterTail.next = null;
        lessTail.next = greaterDummy.next;

        return lessDummy.next;
    }
}
