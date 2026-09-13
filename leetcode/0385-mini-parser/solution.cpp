#include <string>
#include <vector>
#include <stack>
using namespace std;

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *   public:
 *     // Constructor initializes an empty nested list.
 *     NestedInteger();
 *
 *     // Constructor initializes a single integer.
 *     NestedInteger(int value);
 *
 *     // Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     bool isInteger() const;
 *
 *     // Return the single integer that this NestedInteger holds, if it holds a single integer
 *     // The result is undefined if this NestedInteger holds a nested list
 *     int getInteger() const;
 *
 *     // Set this NestedInteger to hold a single integer.
 *     void setInteger(int value);
 *
 *     // Set this NestedInteger to hold a nested list and adds a nested integer to it.
 *     void add(const NestedInteger &ni);
 *
 *     // Return the nested list that this NestedInteger holds, if it holds a nested list
 *     // The result is undefined if this NestedInteger holds a single integer
 *     const vector<NestedInteger> &getList() const;
 * };
 */

class Solution {
public:
    NestedInteger deserialize(string s) {
        if (s[0] != '[') {
            return NestedInteger(stoi(s));
        }

        stack<NestedInteger> st;
        NestedInteger current;
        bool started = false;
        string num;

        for (char ch : s) {
            if (ch == '[') {
                if (started) {
                    st.push(current);
                }
                current = NestedInteger();
                started = true;
            } else if (ch == ']') {
                if (!num.empty()) {
                    current.add(NestedInteger(stoi(num)));
                    num.clear();
                }
                if (!st.empty()) {
                    NestedInteger parent = st.top();
                    st.pop();
                    parent.add(current);
                    current = parent;
                }
            } else if (ch == ',') {
                if (!num.empty()) {
                    current.add(NestedInteger(stoi(num)));
                    num.clear();
                }
            } else {
                num += ch;
            }
        }

        return current;
    }
};
