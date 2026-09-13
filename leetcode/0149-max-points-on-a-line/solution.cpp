#include <vector>
#include <unordered_map>
#include <algorithm>
#include <cstdlib>
using namespace std;

class Solution {
public:
    int maxPoints(vector<vector<int>>& points) {
        int n = points.size();
        if (n <= 2) return n;

        int best = 1;

        for (int i = 0; i < n; i++) {
            unordered_map<long long, int> slopes;
            int x1 = points[i][0], y1 = points[i][1];

            for (int j = 0; j < n; j++) {
                if (j == i) continue;
                int dx = points[j][0] - x1;
                int dy = points[j][1] - y1;

                if (dx == 0) {
                    dx = 0; dy = 1;
                } else {
                    int g = gcd(abs(dx), abs(dy));
                    if (g == 0) g = 1;
                    dx /= g;
                    dy /= g;
                    if (dx < 0) {
                        dx = -dx;
                        dy = -dy;
                    }
                }

                long long key = ((long long)dx << 32) ^ (unsigned int)dy;
                int count = ++slopes[key];
                best = max(best, count + 1);
            }
        }

        return best;
    }

private:
    int gcd(int a, int b) {
        while (b != 0) {
            int t = b;
            b = a % b;
            a = t;
        }
        return a;
    }
};
