#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minNumberOfFrogs(string croakOfFrogs) {
        string order = "croak";
        int idx[128];
        for (int i = 0; i < 5; i++) {
            idx[(int)order[i]] = i;
        }
        int count[5] = {0, 0, 0, 0, 0};
        int busy = 0;
        int maxBusy = 0;

        for (char ch : croakOfFrogs) {
            if (order.find(ch) == string::npos) {
                return -1;
            }
            int i = idx[(int)ch];
            if (i == 0) {
                count[0]++;
                busy++;
                maxBusy = max(maxBusy, busy);
            } else {
                if (count[i - 1] == 0) {
                    return -1;
                }
                count[i - 1]--;
                count[i]++;
                if (i == 4) {
                    count[4]--;
                    busy--;
                }
            }
        }

        for (int i = 0; i < 4; i++) {
            if (count[i] != 0) {
                return -1;
            }
        }
        return maxBusy;
    }
};
