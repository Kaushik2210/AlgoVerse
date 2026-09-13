import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

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
    public int[] nextLargerNodes(ListNode head) {
        List<Integer> values = new ArrayList<>();
        for (ListNode node = head; node != null; node = node.next) {
            values.add(node.val);
        }

        int n = values.size();
        int[] result = new int[n];
        Deque<Integer> stack = new ArrayDeque<>(); // indices awaiting their next greater value

        for (int i = 0; i < n; i++) {
            int val = values.get(i);
            while (!stack.isEmpty() && values.get(stack.peek()) < val) {
                result[stack.pop()] = val;
            }
            stack.push(i);
        }

        return result;
    }
}
