#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
private:
    unordered_map<int, vector<int>> memo;

    vector<int> build(int n) {
        auto it = memo.find(n);
        if (it != memo.end()) {
            return it->second;
        }

        // Split into an "odd-transformed" half and an "even-transformed"
        // half. Any beautiful sub-array, when mapped through 2x-1 (all
        // odd results) or 2x (all even results), stays beautiful -- and
        // gluing an all-odd sequence to an all-even one can never create
        // a new violation, since an odd number and an even number can
        // never average to an integer strictly between them.
        vector<int> oddsSrc = build((n + 1) / 2);
        vector<int> evensSrc = build(n / 2);

        vector<int> result;
        result.reserve(n);
        for (int x : oddsSrc) result.push_back(2 * x - 1);
        for (int x : evensSrc) result.push_back(2 * x);

        memo[n] = result;
        return result;
    }

public:
    vector<int> beautifulArray(int n) {
        memo[1] = {1};
        return build(n);
    }
};
