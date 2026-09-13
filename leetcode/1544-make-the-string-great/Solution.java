class Solution {
    public String makeGood(String s) {
        StringBuilder stack = new StringBuilder();
        for (char ch : s.toCharArray()) {
            int len = stack.length();
            if (len > 0) {
                char top = stack.charAt(len - 1);
                if (top != ch && Character.toLowerCase(top) == Character.toLowerCase(ch)) {
                    stack.deleteCharAt(len - 1);
                    continue;
                }
            }
            stack.append(ch);
        }
        return stack.toString();
    }
}
