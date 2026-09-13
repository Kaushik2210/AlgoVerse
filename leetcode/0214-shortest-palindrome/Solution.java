class Solution {
    public String shortestPalindrome(String s) {
        if (s.isEmpty()) {
            return s;
        }

        String reversed = new StringBuilder(s).reverse().toString();
        String combined = s + "#" + reversed;
        int n = combined.length();
        int[] fail = new int[n];

        for (int i = 1; i < n; i++) {
            int length = fail[i - 1];
            while (length > 0 && combined.charAt(i) != combined.charAt(length)) {
                length = fail[length - 1];
            }
            if (combined.charAt(i) == combined.charAt(length)) {
                length++;
            }
            fail[i] = length;
        }

        int longestPalindromePrefix = fail[n - 1];
        String suffixToPrepend = new StringBuilder(s.substring(longestPalindromePrefix)).reverse().toString();
        return suffixToPrepend + s;
    }
}
