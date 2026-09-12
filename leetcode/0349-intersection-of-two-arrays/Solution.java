import java.util.HashSet;
import java.util.Set;

class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> set1 = new HashSet<>();
        for (int x : nums1) {
            set1.add(x);
        }

        Set<Integer> result = new HashSet<>();
        for (int x : nums2) {
            if (set1.contains(x)) {
                result.add(x);
            }
        }

        int[] output = new int[result.size()];
        int i = 0;
        for (int x : result) {
            output[i++] = x;
        }

        return output;
    }
}
