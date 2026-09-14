class Solution {
    public boolean judgeSquareSum(int c) {
        long a = 0;
        long b = (long) Math.sqrt(c);
        while (b * b > c) {
            b--;
        }
        while (b * b < c && (b + 1) * (b + 1) <= c) {
            b++;
        }

        while (a <= b) {
            long total = a * a + b * b;
            if (total == c) {
                return true;
            } else if (total < c) {
                a++;
            } else {
                b--;
            }
        }

        return false;
    }
}
