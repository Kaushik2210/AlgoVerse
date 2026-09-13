class Solution {
    public int longestPalindrome(String s) {
        int[] counts = new int[128];
        for (char ch : s.toCharArray()) {
            counts[ch]++;
        }

        int length = 0;
        boolean hasOdd = false;
        for (int count : counts) {
            length += count - (count % 2);
            if (count % 2 == 1) {
                hasOdd = true;
            }
        }
        return hasOdd ? length + 1 : length;
    }
}
