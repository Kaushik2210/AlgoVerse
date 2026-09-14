#include <vector>
using namespace std;

class Solution {
public:
    vector<int> pourWater(vector<int>& heights, int volume, int k) {
        int n = (int) heights.size();

        for (int drop = 0; drop < volume; drop++) {
            int best = k;

            int i = k;
            while (i - 1 >= 0 && heights[i - 1] <= heights[i]) {
                i--;
                if (heights[i] < heights[best]) {
                    best = i;
                }
            }
            if (best != k) {
                heights[best]++;
                continue;
            }

            i = k;
            while (i + 1 < n && heights[i + 1] <= heights[i]) {
                i++;
                if (heights[i] < heights[best]) {
                    best = i;
                }
            }

            heights[best]++;
        }

        return heights;
    }
};
