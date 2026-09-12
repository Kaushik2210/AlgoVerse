#include <string>
using namespace std;

class Solution {
public:
    bool backspaceCompare(string s, string t) {
        return build(s) == build(t);
    }

private:
    string build(const string& text) {
        string stack;
        for (char ch : text) {
            if (ch == '#') {
                if (!stack.empty()) {
                    stack.pop_back();
                }
            } else {
                stack.push_back(ch);
            }
        }
        return stack;
    }
};
