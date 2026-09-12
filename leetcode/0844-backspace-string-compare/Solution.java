class Solution {
    public boolean backspaceCompare(String s, String t) {
        return build(s).equals(build(t));
    }

    private String build(String text) {
        StringBuilder stack = new StringBuilder();
        for (char ch : text.toCharArray()) {
            if (ch == '#') {
                if (stack.length() > 0) {
                    stack.deleteCharAt(stack.length() - 1);
                }
            } else {
                stack.append(ch);
            }
        }
        return stack.toString();
    }
}
