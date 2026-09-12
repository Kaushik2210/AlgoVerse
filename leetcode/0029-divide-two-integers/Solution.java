class Solution {
    public int divide(int dividend, int divisor) {
        if (dividend == Integer.MIN_VALUE && divisor == -1) {
            return Integer.MAX_VALUE;
        }

        boolean negative = (dividend < 0) != (divisor < 0);

        long remaining = Math.abs((long) dividend);
        long div = Math.abs((long) divisor);

        long quotient = 0;
        while (remaining >= div) {
            long chunk = div;
            long multiple = 1;
            while (remaining >= (chunk << 1)) {
                chunk <<= 1;
                multiple <<= 1;
            }
            remaining -= chunk;
            quotient += multiple;
        }

        if (negative) {
            quotient = -quotient;
        }

        if (quotient > Integer.MAX_VALUE) return Integer.MAX_VALUE;
        if (quotient < Integer.MIN_VALUE) return Integer.MIN_VALUE;
        return (int) quotient;
    }
}
