class Solution {
public:
    int hammingDistance(int x, int y) {
        unsigned int v = (unsigned int)(x ^ y);
        int count = 0;
        while (v) {
            v &= v - 1;
            count++;
        }
        return count;
    }
};
