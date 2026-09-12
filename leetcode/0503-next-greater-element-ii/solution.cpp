#include <vector>
#include <stack>
using namespace std;

class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        int n = nums.size();
        vector<int> answer(n, -1);
        stack<int> st;  // indices, values in decreasing order

        for (int i = 0; i < 2 * n; i++) {
            int idx = i % n;
            while (!st.empty() && nums[idx] > nums[st.top()]) {
                answer[st.top()] = nums[idx];
                st.pop();
            }
            if (i < n) {
                st.push(idx);
            }
        }

        return answer;
    }
};
