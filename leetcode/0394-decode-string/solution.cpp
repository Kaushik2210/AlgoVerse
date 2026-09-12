#include <string>
#include <stack>
#include <cctype>
using namespace std;

class Solution {
public:
    string decodeString(string s) {
        stack<pair<string, int>> st;  // (previous_string, repeat_count)
        string current;
        int currentNum = 0;

        for (char ch : s) {
            if (isdigit(ch)) {
                currentNum = currentNum * 10 + (ch - '0');
            } else if (ch == '[') {
                st.push({current, currentNum});
                current = "";
                currentNum = 0;
            } else if (ch == ']') {
                auto [prev, num] = st.top();
                st.pop();
                string repeated = prev;
                for (int i = 0; i < num; i++) {
                    repeated += current;
                }
                current = repeated;
            } else {
                current += ch;
            }
        }

        return current;
    }
};
