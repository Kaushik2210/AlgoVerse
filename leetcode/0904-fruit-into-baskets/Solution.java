import java.util.HashMap;
import java.util.Map;

class Solution {
    public int totalFruit(int[] fruits) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < fruits.length; right++) {
            count.merge(fruits[right], 1, Integer::sum);
            while (count.size() > 2) {
                int leftFruit = fruits[left];
                int c = count.get(leftFruit) - 1;
                if (c == 0) {
                    count.remove(leftFruit);
                } else {
                    count.put(leftFruit, c);
                }
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
