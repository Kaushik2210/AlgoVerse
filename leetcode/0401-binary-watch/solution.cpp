#include <vector>
#include <string>
#include <bitset>
using namespace std;

class Solution {
public:
    vector<string> readBinaryWatch(int turnedOn) {
        vector<string> result;
        for (int h = 0; h < 12; h++) {
            for (int m = 0; m < 60; m++) {
                if ((int)bitset<32>(h).count() + (int)bitset<32>(m).count() == turnedOn) {
                    char buf[8];
                    snprintf(buf, sizeof(buf), "%d:%02d", h, m);
                    result.push_back(string(buf));
                }
            }
        }
        return result;
    }
};
