#include <vector>
using namespace std;

class Solution {
private:
    vector<int> validDigits = {0, 1, 6, 8, 9};
    int rotation[10] = {0, 1, -1, -1, -1, -1, 9, -1, 8, 6};
    int count = 0;
    long long n;

    bool isConfusing(long long num) {
        long long rotated = 0;
        long long temp = num;
        while (temp > 0) {
            rotated = rotated * 10 + rotation[temp % 10];
            temp /= 10;
        }
        return rotated != num;
    }

    void backtrack(long long current) {
        if (current > n) {
            return;
        }
        if (current != 0 && isConfusing(current)) {
            count++;
        }

        for (int d : validDigits) {
            if (current == 0 && d == 0) {
                continue;
            }
            long long nextNum = current * 10 + d;
            if (nextNum > n) {
                continue;
            }
            backtrack(nextNum);
        }
    }

public:
    int confusingNumberII(int n) {
        this->n = n;
        count = 0;
        backtrack(0);
        return count;
    }
};
