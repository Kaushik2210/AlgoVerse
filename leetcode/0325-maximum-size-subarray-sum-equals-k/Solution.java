import java.util.HashMap;
import java.util.Map;

class Solution {
    public int maxSubArrayLen(int[] nums, int k) {
        Map<Long, Integer> firstSeen = new HashMap<>();
        firstSeen.put(0L, -1);
        long prefix = 0;
        int best = 0;
        for (int i = 0; i < nums.length; i++) {
            prefix += nums[i];
            long needed = prefix - k;
            if (firstSeen.containsKey(needed)) {
                best = Math.max(best, i - firstSeen.get(needed));
            }
            firstSeen.putIfAbsent(prefix, i);
        }
        return best;
    }
}
