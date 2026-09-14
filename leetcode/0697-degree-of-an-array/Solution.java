import java.util.HashMap;
import java.util.Map;

class Solution {
    public int findShortestSubArray(int[] nums) {
        Map<Integer, Integer> firstIndex = new HashMap<>();
        Map<Integer, Integer> lastIndex = new HashMap<>();
        Map<Integer, Integer> count = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int x = nums[i];
            firstIndex.putIfAbsent(x, i);
            lastIndex.put(x, i);
            count.merge(x, 1, Integer::sum);
        }

        int degree = 0;
        for (int freq : count.values()) {
            degree = Math.max(degree, freq);
        }

        int answer = nums.length;
        for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
            if (entry.getValue() == degree) {
                int x = entry.getKey();
                answer = Math.min(answer, lastIndex.get(x) - firstIndex.get(x) + 1);
            }
        }

        return answer;
    }
}
