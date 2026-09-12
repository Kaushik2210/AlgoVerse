import java.util.Deque;
import java.util.ArrayDeque;
import java.util.Arrays;

class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];
        Arrays.fill(answer, -1);
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < 2 * n; i++) {
            int idx = i % n;
            while (!stack.isEmpty() && nums[idx] > nums[stack.peek()]) {
                answer[stack.pop()] = nums[idx];
            }
            if (i < n) {
                stack.push(idx);
            }
        }

        return answer;
    }
}
