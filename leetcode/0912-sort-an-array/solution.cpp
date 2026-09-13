#include <vector>
#include <cstdlib>
using namespace std;

// Merge sort: guaranteed O(n log n) worst case.
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        vector<int> a = nums;
        mergeSort(a, 0, (int)a.size() - 1);
        return a;
    }

private:
    void mergeSort(vector<int>& a, int lo, int hi) {
        if (lo >= hi) return;
        int mid = lo + (hi - lo) / 2;
        mergeSort(a, lo, mid);
        mergeSort(a, mid + 1, hi);
        merge(a, lo, mid, hi);
    }

    void merge(vector<int>& a, int lo, int mid, int hi) {
        vector<int> temp(hi - lo + 1);
        int i = lo, j = mid + 1, k = 0;
        while (i <= mid && j <= hi) {
            temp[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];
        }
        while (i <= mid) temp[k++] = a[i++];
        while (j <= hi) temp[k++] = a[j++];
        for (int t = 0; t < (int)temp.size(); t++) {
            a[lo + t] = temp[t];
        }
    }
};

// Alternative: quicksort with a randomized pivot, expected O(n log n).
class QuickSortSolution {
public:
    vector<int> sortArray(vector<int>& nums) {
        vector<int> a = nums;
        quicksort(a, 0, (int)a.size() - 1);
        return a;
    }

private:
    void quicksort(vector<int>& a, int lo, int hi) {
        if (lo >= hi) return;
        int p = partition(a, lo, hi);
        quicksort(a, lo, p - 1);
        quicksort(a, p + 1, hi);
    }

    int partition(vector<int>& a, int lo, int hi) {
        int pivotIdx = lo + rand() % (hi - lo + 1);
        swap(a[pivotIdx], a[hi]);
        int pivot = a[hi];

        int i = lo;
        for (int j = lo; j < hi; j++) {
            if (a[j] < pivot) {
                swap(a[i], a[j]);
                i++;
            }
        }
        swap(a[i], a[hi]);
        return i;
    }
};
