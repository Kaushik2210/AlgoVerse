class Solution {
    private int count = 0;

    public int countSubstrings(String s) {
        int n = s.length();
        for (int center = 0; center < n; center++) {
            expand(s, center, center);
            expand(s, center, center + 1);
        }
        return count;
    }

    private void expand(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            count++;
            left--;
            right++;
        }
    }
}
