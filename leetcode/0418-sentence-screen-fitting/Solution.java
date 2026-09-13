class Solution {
    public int wordsTyping(String[] sentence, int rows, int cols) {
        StringBuilder sb = new StringBuilder();
        for (String w : sentence) {
            sb.append(w).append(' ');
        }
        String s = sb.toString();
        int totalLen = s.length();
        int start = 0;

        for (int i = 0; i < rows; i++) {
            start += cols;
            if (s.charAt(start % totalLen) == ' ') {
                start++;
            } else {
                while (start > 0 && s.charAt((start - 1) % totalLen) != ' ') {
                    start--;
                }
            }
        }

        return start / totalLen;
    }
}
