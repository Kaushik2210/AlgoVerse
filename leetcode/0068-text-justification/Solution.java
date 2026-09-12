import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        List<String> result = new ArrayList<>();
        List<String> line = new ArrayList<>();
        int lineLen = 0;

        for (String word : words) {
            int needed = lineLen + word.length() + (line.isEmpty() ? 0 : line.size());
            if (!line.isEmpty() && needed > maxWidth) {
                result.add(formatLine(line, maxWidth, false));
                line = new ArrayList<>();
                lineLen = 0;
            }

            line.add(word);
            lineLen += word.length();
        }

        if (!line.isEmpty()) {
            result.add(formatLine(line, maxWidth, true));
        }

        return result;
    }

    private String formatLine(List<String> line, int maxWidth, boolean last) {
        if (last || line.size() == 1) {
            StringBuilder sb = new StringBuilder(String.join(" ", line));
            while (sb.length() < maxWidth) {
                sb.append(' ');
            }
            return sb.toString();
        }

        int totalChars = 0;
        for (String w : line) totalChars += w.length();

        int gaps = line.size() - 1;
        int totalSpaces = maxWidth - totalChars;
        int baseSpace = totalSpaces / gaps;
        int extra = totalSpaces % gaps;

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < line.size() - 1; i++) {
            sb.append(line.get(i));
            int spaces = baseSpace + (i < extra ? 1 : 0);
            for (int j = 0; j < spaces; j++) sb.append(' ');
        }
        sb.append(line.get(line.size() - 1));

        return sb.toString();
    }
}
