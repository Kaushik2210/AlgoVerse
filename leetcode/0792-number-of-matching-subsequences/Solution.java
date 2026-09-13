import java.util.ArrayList;
import java.util.List;

class Solution {
    private static class Pos {
        String word;
        int index;
        Pos(String word, int index) {
            this.word = word;
            this.index = index;
        }
    }

    public int numMatchingSubseq(String s, String[] words) {
        List<List<Pos>> waiting = new ArrayList<>();
        for (int c = 0; c < 26; c++) {
            waiting.add(new ArrayList<>());
        }

        for (String word : words) {
            waiting.get(word.charAt(0) - 'a').add(new Pos(word, 0));
        }

        int count = 0;
        for (int j = 0; j < s.length(); j++) {
            int c = s.charAt(j) - 'a';
            List<Pos> bucket = waiting.get(c);
            waiting.set(c, new ArrayList<>());
            for (Pos p : bucket) {
                p.index++;
                if (p.index == p.word.length()) {
                    count++;
                } else {
                    waiting.get(p.word.charAt(p.index) - 'a').add(p);
                }
            }
        }

        return count;
    }
}
