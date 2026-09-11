#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int best = 0;

        while (left < right) {
            int width = right - left;
            int shorter = min(height[left], height[right]);
            best = max(best, width * shorter);

            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return best;
    }
};
