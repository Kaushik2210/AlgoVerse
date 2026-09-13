class Solution {
    private final int[] validDigits = {0, 1, 6, 8, 9};
    private final int[] rotation = {0, 1, -1, -1, -1, -1, 9, -1, 8, 6};
    private int count = 0;
    private int n;

    public int confusingNumberII(int n) {
        this.n = n;
        backtrack(0L);
        return count;
    }

    private boolean isConfusing(long num) {
        long rotated = 0;
        long temp = num;
        while (temp > 0) {
            rotated = rotated * 10 + rotation[(int) (temp % 10)];
            temp /= 10;
        }
        return rotated != num;
    }

    private void backtrack(long current) {
        if (current > n) {
            return;
        }
        if (current != 0 && isConfusing(current)) {
            count++;
        }

        for (int d : validDigits) {
            if (current == 0 && d == 0) {
                continue;
            }
            long nextNum = current * 10 + d;
            if (nextNum > n) {
                continue;
            }
            backtrack(nextNum);
        }
    }
}
