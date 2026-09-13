class Solution {
    private int count = 0;

    public int reversePairs(int[] nums) {
        mergeSort(nums, 0, nums.length - 1);
        return count;
    }

    private void mergeSort(int[] arr, int lo, int hi) {
        if (lo >= hi) return;
        int mid = (lo + hi) / 2;
        mergeSort(arr, lo, mid);
        mergeSort(arr, mid + 1, hi);

        // count qualifying pairs across the two halves BEFORE merging them,
        // while both halves are still individually sorted
        int j = mid + 1;
        for (int i = lo; i <= mid; i++) {
            while (j <= hi && (long) arr[i] > 2L * arr[j]) {
                j++;
            }
            count += (j - (mid + 1));
        }

        // now do the normal merge step
        int[] merged = new int[hi - lo + 1];
        int i = lo, k = mid + 1, m = 0;
        while (i <= mid && k <= hi) {
            if (arr[i] <= arr[k]) {
                merged[m++] = arr[i++];
            } else {
                merged[m++] = arr[k++];
            }
        }
        while (i <= mid) merged[m++] = arr[i++];
        while (k <= hi) merged[m++] = arr[k++];

        System.arraycopy(merged, 0, arr, lo, merged.length);
    }
}
