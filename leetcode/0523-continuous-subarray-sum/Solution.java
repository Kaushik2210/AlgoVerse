import java.util.HashMap;
import java.util.Map;

class Solution {
    public boolean checkSubarraySum(int[] nums, int k) {
        Map<Integer, Integer> firstIndex = new HashMap<>();
        firstIndex.put(0, -1);

        long prefixSum = 0;

        for (int i = 0; i < nums.length; i++) {
            prefixSum += nums[i];
            int remainder = (int) (prefixSum % k);

            if (firstIndex.containsKey(remainder)) {
                if (i - firstIndex.get(remainder) >= 2) {
                    return true;
                }
            } else {
                firstIndex.put(remainder, i);
            }
        }

        return false;
    }
}
