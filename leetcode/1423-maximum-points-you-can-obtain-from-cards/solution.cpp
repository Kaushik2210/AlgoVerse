#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxScore(vector<int>& cardPoints, int k) {
        int n = cardPoints.size();
        int total = accumulate(cardPoints.begin(), cardPoints.end(), 0);

        int windowSize = n - k;
        if (windowSize == 0) {
            return total;
        }

        int window = 0;
        for (int i = 0; i < windowSize; i++) {
            window += cardPoints[i];
        }

        int minWindow = window;
        for (int i = windowSize; i < n; i++) {
            window += cardPoints[i] - cardPoints[i - windowSize];
            minWindow = min(minWindow, window);
        }

        return total - minWindow;
    }
};
