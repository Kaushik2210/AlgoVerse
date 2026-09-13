#include <vector>
#include <stack>
using namespace std;

class Solution {
public:
    bool validateStackSequences(vector<int>& pushed, vector<int>& popped) {
        stack<int> st;
        int popIndex = 0;

        for (int val : pushed) {
            st.push(val);
            while (!st.empty() && popIndex < (int)popped.size() && st.top() == popped[popIndex]) {
                st.pop();
                popIndex++;
            }
        }

        return st.empty();
    }
};
