#include <vector>
using namespace std;

class Solution {
    long long count = 0;

    void mergeSort(vector<int>& arr, int lo, int hi) {
        if (lo >= hi) return;
        int mid = (lo + hi) / 2;
        mergeSort(arr, lo, mid);
        mergeSort(arr, mid + 1, hi);

        // count qualifying pairs across the two halves BEFORE merging them,
        // while both halves are still individually sorted
        int j = mid + 1;
        for (int i = lo; i <= mid; i++) {
            while (j <= hi && (long long)arr[i] > 2LL * arr[j]) {
                j++;
            }
            count += (j - (mid + 1));
        }

        // now do the normal merge step
        vector<int> merged(hi - lo + 1);
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

        for (int t = 0; t < (int)merged.size(); t++) {
            arr[lo + t] = merged[t];
        }
    }

public:
    int reversePairs(vector<int>& nums) {
        mergeSort(nums, 0, (int)nums.size() - 1);
        return (int)count;
    }
};
