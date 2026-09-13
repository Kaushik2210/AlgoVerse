#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isStrobogrammatic(string num) {
        unordered_map<char, char> pairs = {
            {'0', '0'}, {'1', '1'}, {'6', '9'}, {'8', '8'}, {'9', '6'}
        };

        int left = 0, right = (int)num.size() - 1;
        while (left <= right) {
            auto it = pairs.find(num[left]);
            if (it == pairs.end() || it->second != num[right]) {
                return false;
            }
            left++;
            right--;
        }

        return true;
    }
};
