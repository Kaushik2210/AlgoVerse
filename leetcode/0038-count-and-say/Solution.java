class Solution {
    public String countAndSay(int n) {
        String result = "1";
        for (int k = 0; k < n - 1; k++) {
            StringBuilder next = new StringBuilder();
            int i = 0;
            while (i < result.length()) {
                int j = i;
                while (j < result.length() && result.charAt(j) == result.charAt(i)) {
                    j++;
                }
                next.append(j - i);
                next.append(result.charAt(i));
                i = j;
            }
            result = next.toString();
        }
        return result;
    }
}
