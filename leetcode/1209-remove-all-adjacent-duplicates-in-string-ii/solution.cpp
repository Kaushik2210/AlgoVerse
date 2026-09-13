#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    string removeDuplicates(string s, int k) {
        vector<pair<char, int>> stack;
        for (char ch : s) {
            if (!stack.empty() && stack.back().first == ch) {
                stack.back().second++;
            } else {
                stack.push_back({ch, 1});
            }
            if (stack.back().second == k) {
                stack.pop_back();
            }
        }

        string result;
        for (auto& [ch, count] : stack) {
            result.append(count, ch);
        }
        return result;
    }
};
