import java.util.Random;

class Solution {
    // Merge sort: guaranteed O(n log n) worst case.
    public int[] sortArray(int[] nums) {
        if (nums.length <= 1) return nums;
        int[] copy = nums.clone();
        mergeSort(copy, 0, copy.length - 1);
        return copy;
    }

    private void mergeSort(int[] a, int lo, int hi) {
        if (lo >= hi) return;
        int mid = lo + (hi - lo) / 2;
        mergeSort(a, lo, mid);
        mergeSort(a, mid + 1, hi);
        merge(a, lo, mid, hi);
    }

    private void merge(int[] a, int lo, int mid, int hi) {
        int[] temp = new int[hi - lo + 1];
        int i = lo, j = mid + 1, k = 0;
        while (i <= mid && j <= hi) {
            temp[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];
        }
        while (i <= mid) temp[k++] = a[i++];
        while (j <= hi) temp[k++] = a[j++];
        System.arraycopy(temp, 0, a, lo, temp.length);
    }
}

// Alternative: quicksort with a randomized pivot, expected O(n log n).
class QuickSortSolution {
    private final Random rand = new Random();

    public int[] sortArray(int[] nums) {
        int[] copy = nums.clone();
        quicksort(copy, 0, copy.length - 1);
        return copy;
    }

    private void quicksort(int[] a, int lo, int hi) {
        if (lo >= hi) return;
        int p = partition(a, lo, hi);
        quicksort(a, lo, p - 1);
        quicksort(a, p + 1, hi);
    }

    private int partition(int[] a, int lo, int hi) {
        int pivotIdx = lo + rand.nextInt(hi - lo + 1);
        swap(a, pivotIdx, hi);
        int pivot = a[hi];

        int i = lo;
        for (int j = lo; j < hi; j++) {
            if (a[j] < pivot) {
                swap(a, i, j);
                i++;
            }
        }
        swap(a, i, hi);
        return i;
    }

    private void swap(int[] a, int i, int j) {
        int tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
}
