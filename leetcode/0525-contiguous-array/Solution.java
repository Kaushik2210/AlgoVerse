import java.util.HashMap;
import java.util.Map;

class Solution {
    public int findMaxLength(int[] nums) {
        Map<Integer, Integer> firstSeen = new HashMap<>();
        firstSeen.put(0, -1);
        int balance = 0;
        int best = 0;
        for (int i = 0; i < nums.length; i++) {
            balance += nums[i] == 1 ? 1 : -1;
            if (firstSeen.containsKey(balance)) {
                best = Math.max(best, i - firstSeen.get(balance));
            } else {
                firstSeen.put(balance, i);
            }
        }
        return best;
    }
}
