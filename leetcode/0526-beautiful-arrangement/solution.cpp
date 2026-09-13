#include <vector>
using namespace std;

class Solution {
private:
    vector<bool> used;
    int count = 0;
    int n;

    void backtrack(int pos) {
        if (pos > n) {
            count++;
            return;
        }
        for (int num = 1; num <= n; num++) {
            if (!used[num] && (num % pos == 0 || pos % num == 0)) {
                used[num] = true;
                backtrack(pos + 1);
                used[num] = false;
            }
        }
    }

public:
    int countArrangement(int n) {
        this->n = n;
        used.assign(n + 1, false);
        count = 0;
        backtrack(1);
        return count;
    }
};
