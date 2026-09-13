#include <vector>
#include <stack>
#include <climits>
using namespace std;

class Solution {
public:
    bool verifyPreorder(vector<int>& preorder) {
        stack<int> st;
        long long lowerBound = LLONG_MIN;

        for (int num : preorder) {
            if (num < lowerBound) {
                return false;
            }
            while (!st.empty() && st.top() < num) {
                lowerBound = st.top();
                st.pop();
            }
            st.push(num);
        }

        return true;
    }
};
