class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int best = 0;

        while (left < right) {
            int width = right - left;
            int shorter = Math.min(height[left], height[right]);
            best = Math.max(best, width * shorter);

            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return best;
    }
}
