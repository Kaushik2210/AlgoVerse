import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int x : nums) {
            counts.merge(x, 1, Integer::sum);
        }

        int n = nums.length;
        List<List<Integer>> buckets = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            buckets.add(new ArrayList<>());
        }
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            buckets.get(entry.getValue()).add(entry.getKey());
        }

        int[] result = new int[k];
        int idx = 0;
        for (int freq = n; freq >= 1 && idx < k; freq--) {
            for (int value : buckets.get(freq)) {
                result[idx++] = value;
                if (idx == k) break;
            }
        }

        return result;
    }
}
