import java.util.ArrayDeque;
import java.util.Deque;

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * public interface NestedInteger {
 *
 *     // Constructor initializes an empty nested list.
 *     public NestedInteger();
 *
 *     // Constructor initializes a single integer.
 *     public NestedInteger(int value);
 *
 *     // @return true if this NestedInteger holds a single integer, rather than a nested list.
 *     public boolean isInteger();
 *
 *     // @return the single integer that this NestedInteger holds, if it holds a single integer
 *     // Return null if this NestedInteger holds a nested list
 *     public Integer getInteger();
 *
 *     // Set this NestedInteger to hold a single integer.
 *     public void setInteger(int value);
 *
 *     // Set this NestedInteger to hold a nested list and adds a nested integer to it.
 *     public void add(NestedInteger ni);
 *
 *     // @return the nested list that this NestedInteger holds, if it holds a nested list
 *     // Return null if this NestedInteger holds a single integer
 *     public List<NestedInteger> getList();
 * }
 */
class Solution {
    public NestedInteger deserialize(String s) {
        if (s.charAt(0) != '[') {
            return new NestedInteger(Integer.parseInt(s));
        }

        Deque<NestedInteger> stack = new ArrayDeque<>();
        NestedInteger current = null;
        StringBuilder num = new StringBuilder();

        for (char ch : s.toCharArray()) {
            if (ch == '[') {
                if (current != null) {
                    stack.push(current);
                }
                current = new NestedInteger();
            } else if (ch == ']') {
                if (num.length() > 0) {
                    current.add(new NestedInteger(Integer.parseInt(num.toString())));
                    num.setLength(0);
                }
                if (!stack.isEmpty()) {
                    NestedInteger parent = stack.pop();
                    parent.add(current);
                    current = parent;
                }
            } else if (ch == ',') {
                if (num.length() > 0) {
                    current.add(new NestedInteger(Integer.parseInt(num.toString())));
                    num.setLength(0);
                }
            } else {
                num.append(ch);
            }
        }

        return current;
    }
}
