#include <vector>
using namespace std;

class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int write = 0;

        for (int read = 0; read < (int)nums.size(); read++) {
            if (write < 2 || nums[read] != nums[write - 2]) {
                nums[write] = nums[read];
                write++;
            }
        }

        return write;
    }
};
