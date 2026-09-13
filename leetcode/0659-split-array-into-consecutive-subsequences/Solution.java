import java.util.HashMap;
import java.util.Map;

class Solution {
    public boolean isPossible(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int x : nums) count.merge(x, 1, Integer::sum);
        Map<Integer, Integer> tails = new HashMap<>();

        for (int x : nums) {
            if (count.getOrDefault(x, 0) == 0) continue;
            count.merge(x, -1, Integer::sum);

            if (tails.getOrDefault(x - 1, 0) > 0) {
                tails.merge(x - 1, -1, Integer::sum);
                tails.merge(x, 1, Integer::sum);
            } else if (count.getOrDefault(x + 1, 0) > 0 && count.getOrDefault(x + 2, 0) > 0) {
                count.merge(x + 1, -1, Integer::sum);
                count.merge(x + 2, -1, Integer::sum);
                tails.merge(x + 2, 1, Integer::sum);
            } else {
                return false;
            }
        }
        return true;
    }
}
