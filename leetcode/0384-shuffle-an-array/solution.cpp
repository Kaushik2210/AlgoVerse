#include <vector>
#include <cstdlib>
using namespace std;

class Solution {
public:
    Solution(vector<int>& nums) : original(nums), array(nums) {}

    vector<int> reset() {
        array = original;
        return array;
    }

    vector<int> shuffle() {
        array = original;
        for (int i = (int)array.size() - 1; i > 0; i--) {
            int j = rand() % (i + 1);
            swap(array[i], array[j]);
        }
        return array;
    }

private:
    vector<int> original;
    vector<int> array;
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(nums);
 * vector<int> param_1 = obj->reset();
 * vector<int> param_2 = obj->shuffle();
 */
