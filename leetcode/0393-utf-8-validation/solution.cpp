#include <vector>
using namespace std;

class Solution {
public:
    bool validUtf8(vector<int>& data) {
        int remaining = 0;
        for (int raw : data) {
            int b = raw & 0xFF;
            if (remaining == 0) {
                if ((b & 0x80) == 0) {
                    continue;
                } else if ((b & 0xE0) == 0xC0) {
                    remaining = 1;
                } else if ((b & 0xF0) == 0xE0) {
                    remaining = 2;
                } else if ((b & 0xF8) == 0xF0) {
                    remaining = 3;
                } else {
                    return false;
                }
            } else {
                if ((b & 0xC0) != 0x80) {
                    return false;
                }
                remaining--;
            }
        }
        return remaining == 0;
    }
};
