#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSatisfied(vector<int>& customers, vector<int>& grumpy, int minutes) {
        int n = customers.size();
        int base = 0;
        for (int i = 0; i < n; i++) {
            if (grumpy[i] == 0) {
                base += customers[i];
            }
        }

        int window = 0;
        int extra = 0;
        for (int i = 0; i < n; i++) {
            if (grumpy[i] == 1) {
                window += customers[i];
            }
            if (i >= minutes && grumpy[i - minutes] == 1) {
                window -= customers[i - minutes];
            }
            extra = max(extra, window);
        }

        return base + extra;
    }
};
