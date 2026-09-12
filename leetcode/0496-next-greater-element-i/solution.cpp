#include <vector>
#include <stack>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> nextGreater;
        stack<int> st;  // values in decreasing order

        for (int num : nums2) {
            while (!st.empty() && num > st.top()) {
                nextGreater[st.top()] = num;
                st.pop();
            }
            st.push(num);
        }

        vector<int> result;
        result.reserve(nums1.size());
        for (int num : nums1) {
            auto it = nextGreater.find(num);
            result.push_back(it != nextGreater.end() ? it->second : -1);
        }

        return result;
    }
};
