import java.util.HashMap;
import java.util.Map;

class Solution {
    public int findPairs(int[] nums, int k) {
        if (k < 0) {
            return 0;
        }

        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.merge(num, 1, Integer::sum);
        }

        int result = 0;
        if (k == 0) {
            for (int freq : count.values()) {
                if (freq > 1) {
                    result++;
                }
            }
        } else {
            for (int value : count.keySet()) {
                if (count.containsKey(value + k)) {
                    result++;
                }
            }
        }

        return result;
    }
}
