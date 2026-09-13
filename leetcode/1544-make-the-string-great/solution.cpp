#include <string>
#include <cctype>
using namespace std;

class Solution {
public:
    string makeGood(string s) {
        string stack;
        for (char ch : s) {
            if (!stack.empty() && stack.back() != ch &&
                tolower(stack.back()) == tolower(ch)) {
                stack.pop_back();
            } else {
                stack.push_back(ch);
            }
        }
        return stack;
    }
};
