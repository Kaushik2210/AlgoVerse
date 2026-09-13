#include <vector>
using namespace std;

class Solution {
    vector<int> nums, indices, counts;

    void mergeSort(int lo, int hi) {
        if (hi - lo <= 1) return;
        int mid = (lo + hi) / 2;
        mergeSort(lo, mid);
        mergeSort(mid, hi);

        vector<int> merged(hi - lo);
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

        for (int t = 0; t < (int)merged.size(); t++) {
            indices[lo + t] = merged[t];
        }
    }

public:
    vector<int> countSmaller(vector<int>& nums) {
        int n = (int)nums.size();
        this->nums = nums;
        indices.resize(n);
        counts.assign(n, 0);
        for (int i = 0; i < n; i++) indices[i] = i;

        mergeSort(0, n);
        return counts;
    }
};
