import java.util.*;

class Solution {
    public String arrangeWords(String text) {
        String[] words = text.split(" ");
        words[0] = words[0].toLowerCase();

        // stable sort preserves original relative order among equal lengths
        Arrays.sort(words, Comparator.comparingInt(String::length));

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            String w = words[i];
            if (i == 0) {
                w = Character.toUpperCase(w.charAt(0)) + w.substring(1);
            }
            sb.append(w);
            if (i != words.length - 1) sb.append(' ');
        }
        return sb.toString();
    }
}
