class Solution {
    public boolean isOneEditDistance(String s, String t) {
        if (Math.abs(s.length() - t.length()) > 1) {
            return false;
        }

        if (s.length() == t.length()) {
            int differences = 0;
            for (int k = 0; k < s.length(); k++) {
                if (s.charAt(k) != t.charAt(k)) {
                    differences++;
                }
            }
            return differences == 1;
        }

        String shorter = s.length() < t.length() ? s : t;
        String longer = s.length() < t.length() ? t : s;

        int i = 0, j = 0;
        boolean foundDifference = false;
        while (i < shorter.length() && j < longer.length()) {
            if (shorter.charAt(i) == longer.charAt(j)) {
                i++;
                j++;
            } else {
                if (foundDifference) {
                    return false;
                }
                foundDifference = true;
                j++;
            }
        }

        return true;
    }
}
