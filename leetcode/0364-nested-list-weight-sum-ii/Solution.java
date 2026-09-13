import java.util.List;

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * public interface NestedInteger {
 *
 *     // @return true if this NestedInteger holds a single integer, rather than a nested list.
 *     public boolean isInteger();
 *
 *     // @return the single integer that this NestedInteger holds, if it holds a single integer
 *     // Return null if this NestedInteger holds a nested list
 *     public Integer getInteger();
 *
 *     // @return the nested list that this NestedInteger holds, if it holds a nested list
 *     // Return null if this NestedInteger holds a single integer
 *     public List<NestedInteger> getList();
 * }
 */
class Solution {
    public int depthSumInverse(List<NestedInteger> nestedList) {
        int bottom = maxDepth(nestedList, 1);
        return helper(nestedList, 1, bottom);
    }

    private int maxDepth(List<NestedInteger> items, int depth) {
        int deepest = depth;
        for (NestedInteger item : items) {
            if (!item.isInteger()) {
                deepest = Math.max(deepest, maxDepth(item.getList(), depth + 1));
            }
        }
        return deepest;
    }

    private int helper(List<NestedInteger> items, int depth, int bottom) {
        int total = 0;
        for (NestedInteger item : items) {
            if (item.isInteger()) {
                total += item.getInteger() * (bottom - depth + 1);
            } else {
                total += helper(item.getList(), depth + 1, bottom);
            }
        }
        return total;
    }
}
