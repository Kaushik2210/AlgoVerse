import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            int[] temp = nums1;
            nums1 = nums2;
            nums2 = temp;
        }

        Map<Integer, Integer> counts = new HashMap<>();
        for (int x : nums1) {
            counts.merge(x, 1, Integer::sum);
        }

        List<Integer> result = new ArrayList<>();
        for (int x : nums2) {
            int count = counts.getOrDefault(x, 0);
            if (count > 0) {
                result.add(x);
                counts.put(x, count - 1);
            }
        }

        int[] output = new int[result.size()];
        for (int i = 0; i < result.size(); i++) {
            output[i] = result.get(i);
        }

        return output;
    }
}
