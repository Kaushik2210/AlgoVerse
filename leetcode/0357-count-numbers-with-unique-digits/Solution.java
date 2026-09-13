class Solution {
    public int countNumbersWithUniqueDigits(int n) {
        if (n == 0) {
            return 1;
        }

        int total = 10;
        int uniqueCount = 9;
        int available = 9;

        for (int k = 2; k <= Math.min(n, 10); k++) {
            uniqueCount *= available;
            total += uniqueCount;
            available--;
        }

        return total;
    }
}
