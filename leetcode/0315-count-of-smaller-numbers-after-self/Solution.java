import java.util.ArrayList;
import java.util.List;

class Solution {
    private int[] nums;
    private int[] indices;
    private int[] counts;

    public List<Integer> countSmaller(int[] nums) {
        int n = nums.length;
        this.nums = nums;
        this.indices = new int[n];
        this.counts = new int[n];
        for (int i = 0; i < n; i++) indices[i] = i;

        mergeSort(0, n);

        List<Integer> result = new ArrayList<>();
        for (int c : counts) result.add(c);
        return result;
    }

    private void mergeSort(int lo, int hi) {
        if (hi - lo <= 1) return;
        int mid = (lo + hi) / 2;
        mergeSort(lo, mid);
        mergeSort(mid, hi);

        int[] merged = new int[hi - lo];
        int i = lo, j = mid, k = 0, rightTaken = 0;
        while (i < mid && j < hi) {
            if (nums[indices[i]] <= nums[indices[j]]) {
                counts[indices[i]] += rightTaken;
                merged[k++] = indices[i++];
            } else {
                merged[k++] = indices[j++];
                rightTaken++;
            }
        }
        while (i < mid) {
            counts[indices[i]] += rightTaken;
            merged[k++] = indices[i++];
        }
        while (j < hi) {
            merged[k++] = indices[j++];
        }

        System.arraycopy(merged, 0, indices, lo, merged.length);
    }
}
