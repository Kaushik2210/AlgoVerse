class Solution {
    public int superpalindromesInRange(String left, String right) {
        long lo = Long.parseLong(left);
        long hi = Long.parseLong(right);
        int count = 0;
        int limit = 100000;

        for (int seed = 1; seed < limit; seed++) {
            String s = Integer.toString(seed);

            String oddStr = s + new StringBuilder(s.substring(0, s.length() - 1)).reverse().toString();
            String evenStr = s + new StringBuilder(s).reverse().toString();

            long oddRoot = Long.parseLong(oddStr);
            long evenRoot = Long.parseLong(evenStr);

            for (long root : new long[]{oddRoot, evenRoot}) {
                long square = root * root;
                if (square > hi) continue;
                if (square >= lo && isPalindrome(square)) {
                    count++;
                }
            }
        }

        return count;
    }

    private boolean isPalindrome(long n) {
        String s = Long.toString(n);
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s.charAt(i) != s.charAt(j)) return false;
            i++;
            j--;
        }
        return true;
    }
}
