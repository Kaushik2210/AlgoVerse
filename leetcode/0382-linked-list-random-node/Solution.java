import java.util.Random;

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
    private final ListNode head;
    private final Random random = new Random();

    public Solution(ListNode head) {
        this.head = head;
    }

    public int getRandom() {
        int result = head.val;
        ListNode node = head.next;
        int count = 1;
        while (node != null) {
            count++;
            if (random.nextInt(count) == 0) {
                result = node.val;
            }
            node = node.next;
        }
        return result;
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(head);
 * int param_1 = obj.getRandom();
 */
