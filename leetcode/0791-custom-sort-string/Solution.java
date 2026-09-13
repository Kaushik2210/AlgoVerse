class Solution {
    public String customSortString(String order, String s) {
        int[] counts = new int[26];
        for (char c : s.toCharArray()) {
            counts[c - 'a']++;
        }

        StringBuilder sb = new StringBuilder();
        for (char c : order.toCharArray()) {
            int idx = c - 'a';
            for (int i = 0; i < counts[idx]; i++) {
                sb.append(c);
            }
            counts[idx] = 0;
        }

        for (int i = 0; i < 26; i++) {
            for (int j = 0; j < counts[i]; j++) {
                sb.append((char) ('a' + i));
            }
        }

        return sb.toString();
    }
}
