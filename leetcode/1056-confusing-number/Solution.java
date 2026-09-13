class Solution {
    public boolean confusingNumber(int n) {
        int[] rotation = {0, 1, -1, -1, -1, -1, 9, -1, 8, 6};

        int original = n;
        long rotated = 0;
        while (n > 0) {
            int digit = n % 10;
            if (rotation[digit] == -1) {
                return false;
            }
            // The digit we just peeled off (currently the least
            // significant) becomes the new MOST significant digit once
            // the whole number is flipped 180 degrees, so build the
            // result by shifting left and appending, not by place value.
            rotated = rotated * 10 + rotation[digit];
            n /= 10;
        }

        return rotated != original;
    }
}
