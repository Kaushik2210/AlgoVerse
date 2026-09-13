class Solution {
    public int compress(char[] chars) {
        int write = 0;
        int read = 0;
        int n = chars.length;

        while (read < n) {
            char c = chars[read];
            int start = read;
            while (read < n && chars[read] == c) {
                read++;
            }
            int count = read - start;

            chars[write++] = c;

            if (count > 1) {
                for (char digit : String.valueOf(count).toCharArray()) {
                    chars[write++] = digit;
                }
            }
        }

        return write;
    }
}
