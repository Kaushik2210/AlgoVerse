#include <vector>
using namespace std;

class Solution {
public:
    vector<double> getCollisionTimes(vector<vector<int>>& cars) {
        int n = (int)cars.size();
        vector<double> ans(n, -1.0);
        vector<int> stack; // candidate obstacles ahead, back of vector = top

        for (int i = n - 1; i >= 0; i--) {
            int posI = cars[i][0], speedI = cars[i][1];

            while (!stack.empty()) {
                int j = stack.back();
                int posJ = cars[j][0], speedJ = cars[j][1];

                if (speedI <= speedJ) {
                    stack.pop_back();
                    continue;
                }

                double timeToJ = (double)(posJ - posI) / (speedI - speedJ);
                if (ans[j] != -1.0 && timeToJ >= ans[j]) {
                    stack.pop_back();
                    continue;
                }

                break;
            }

            if (!stack.empty()) {
                int j = stack.back();
                int posJ = cars[j][0], speedJ = cars[j][1];
                ans[i] = (double)(posJ - posI) / (speedI - speedJ);
            }

            stack.push_back(i);
        }

        return ans;
    }
};
