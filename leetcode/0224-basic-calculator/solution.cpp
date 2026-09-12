#include <string>
#include <stack>
#include <cctype>
using namespace std;

class Solution {
public:
    int calculate(string s) {
        stack<pair<int, int>> st;  // (result_so_far, sign) saved across '('
        int result = 0;
        int sign = 1;
        int i = 0;
        int n = s.size();

        while (i < n) {
            char ch = s[i];

            if (isdigit(ch)) {
                int num = 0;
                while (i < n && isdigit(s[i])) {
                    num = num * 10 + (s[i] - '0');
                    i++;
                }
                result += sign * num;
                continue;
            } else if (ch == '+') {
                sign = 1;
            } else if (ch == '-') {
                sign = -1;
            } else if (ch == '(') {
                st.push({result, sign});
                result = 0;
                sign = 1;
            } else if (ch == ')') {
                auto [prevResult, prevSign] = st.top();
                st.pop();
                result = prevResult + prevSign * result;
            }

            i++;
        }

        return result;
    }
};
