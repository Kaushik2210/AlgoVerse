#include <vector>
#include <algorithm>
using namespace std;

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *   public:
 *     // Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     bool isInteger() const;
 *
 *     // Return the single integer that this NestedInteger holds, if it holds a single integer
 *     // The result is undefined if this NestedInteger holds a nested list
 *     int getInteger() const;
 *
 *     // Return the nested list that this NestedInteger holds, if it holds a nested list
 *     // The result is undefined if this NestedInteger holds a single integer
 *     const vector<NestedInteger> &getList() const;
 * };
 */

class Solution {
public:
    int depthSumInverse(vector<NestedInteger>& nestedList) {
        int bottom = maxDepth(nestedList, 1);
        return helper(nestedList, 1, bottom);
    }

private:
    int maxDepth(const vector<NestedInteger>& items, int depth) {
        int deepest = depth;
        for (const auto& item : items) {
            if (!item.isInteger()) {
                deepest = max(deepest, maxDepth(item.getList(), depth + 1));
            }
        }
        return deepest;
    }

    int helper(const vector<NestedInteger>& items, int depth, int bottom) {
        int total = 0;
        for (const auto& item : items) {
            if (item.isInteger()) {
                total += item.getInteger() * (bottom - depth + 1);
            } else {
                total += helper(item.getList(), depth + 1, bottom);
            }
        }
        return total;
    }
};
