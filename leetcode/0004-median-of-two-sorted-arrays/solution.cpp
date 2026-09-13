#include <vector>
#include <climits>
#include <algorithm>
#include <stdexcept>
using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) {
            return findMedianSortedArrays(nums2, nums1);
        }

        int m = (int)nums1.size(), n = (int)nums2.size();
        int half = (m + n + 1) / 2;

        int lo = 0, hi = m;
        while (lo <= hi) {
            int i = lo + (hi - lo) / 2;
            int j = half - i;

            long left1 = (i > 0) ? nums1[i - 1] : LONG_MIN;
            long right1 = (i < m) ? nums1[i] : LONG_MAX;
            long left2 = (j > 0) ? nums2[j - 1] : LONG_MIN;
            long right2 = (j < n) ? nums2[j] : LONG_MAX;

            if (left1 > right2) {
                hi = i - 1;
            } else if (left2 > right1) {
                lo = i + 1;
            } else {
                if ((m + n) % 2 == 1) {
                    return (double)max(left1, left2);
                }
                return (max(left1, left2) + min(right1, right2)) / 2.0;
            }
        }

        throw invalid_argument("input arrays are not sorted");
    }
};
