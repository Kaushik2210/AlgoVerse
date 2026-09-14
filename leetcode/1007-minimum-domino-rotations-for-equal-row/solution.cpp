#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minDominoRotations(vector<int>& tops, vector<int>& bottoms) {
        int result = rotationsNeeded(tops, bottoms, tops[0]);
        if (result != -1) {
            return result;
        }
        return rotationsNeeded(tops, bottoms, bottoms[0]);
    }

private:
    int rotationsNeeded(vector<int>& tops, vector<int>& bottoms, int target) {
        int rotateTop = 0, rotateBottom = 0;
        for (int i = 0; i < (int) tops.size(); i++) {
            int a = tops[i], b = bottoms[i];
            if (a != target && b != target) {
                return -1;
            } else if (a != target) {
                rotateTop++;
            } else if (b != target) {
                rotateBottom++;
            }
        }
        return min(rotateTop, rotateBottom);
    }
};
