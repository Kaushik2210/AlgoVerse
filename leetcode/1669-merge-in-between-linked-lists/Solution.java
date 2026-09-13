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
    public ListNode mergeInBetween(ListNode list1, int a, int b, ListNode list2) {
        ListNode before = list1;
        for (int i = 0; i < a - 1; i++) {
            before = before.next;
        }

        ListNode after = before;
        for (int i = 0; i < b - a + 2; i++) {
            after = after.next;
        }

        before.next = list2;

        ListNode tail2 = list2;
        while (tail2.next != null) {
            tail2 = tail2.next;
        }
        tail2.next = after;

        return list1;
    }
}
