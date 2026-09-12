class Solution {
    public int characterReplacement(String s, int k) {
        int[] counts = new int[26];
        int left = 0;
        int maxFreq = 0;
        int best = 0;

        for (int right = 0; right < s.length(); right++) {
            int c = s.charAt(right) - 'A';
            counts[c]++;
            maxFreq = Math.max(maxFreq, counts[c]);

            int windowLen = right - left + 1;
            if (windowLen - maxFreq > k) {
                counts[s.charAt(left) - 'A']--;
                left++;
            }

            best = Math.max(best, right - left + 1);
        }

        return best;
    }
}
