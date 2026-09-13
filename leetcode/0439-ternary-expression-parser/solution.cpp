#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    string parseTernary(string expression) {
        stack<char> st;

        for (int i = (int)expression.size() - 1; i >= 0; i--) {
            char ch = expression[i];
            if (!st.empty() && st.top() == '?') {
                st.pop(); // discard '?'
                char trueBranch = st.top();
                st.pop();
                st.pop(); // discard ':'
                char falseBranch = st.top();
                st.pop();
                st.push(ch == 'T' ? trueBranch : falseBranch);
            } else {
                st.push(ch);
            }
        }

        return string(1, st.top());
    }
};
