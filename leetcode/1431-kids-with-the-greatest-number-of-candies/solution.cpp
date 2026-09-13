#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<bool> kidsWithCandies(vector<int>& candies, int extraCandies) {
        int greatest = *max_element(candies.begin(), candies.end());

        vector<bool> result;
        result.reserve(candies.size());
        for (int c : candies) {
            result.push_back(c + extraCandies >= greatest);
        }
        return result;
    }
};
