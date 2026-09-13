import java.util.HashMap;
import java.util.Map;

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
    public ListNode removeZeroSumSublists(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;

        Map<Integer, ListNode> lastSeen = new HashMap<>();
        int prefixSum = 0;
        lastSeen.put(0, dummy);
        for (ListNode node = head; node != null; node = node.next) {
            prefixSum += node.val;
            lastSeen.put(prefixSum, node);
        }

        prefixSum = 0;
        ListNode node = dummy;
        while (node != null) {
            prefixSum += node.val;
            node.next = lastSeen.get(prefixSum).next;
            node = node.next;
        }

        return dummy.next;
    }
}
