import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Collections;

class Solution {
    public int minSetSize(int[] arr) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int x : arr) freq.merge(x, 1, Integer::sum);

        List<Integer> counts = new ArrayList<>(freq.values());
        Collections.sort(counts, Collections.reverseOrder());

        int n = arr.length;
        int removed = 0;
        for (int i = 0; i < counts.size(); i++) {
            removed += counts.get(i);
            if (removed * 2 >= n) return i + 1;
        }
        return counts.size();
    }
}
