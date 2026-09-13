import java.util.ArrayList;
import java.util.List;

class Solution {
    private final List<String> result = new ArrayList<>();
    private char[] chars;

    public List<String> letterCasePermutation(String s) {
        chars = s.toCharArray();
        backtrack(0);
        return result;
    }

    private void backtrack(int index) {
        if (index == chars.length) {
            result.add(new String(chars));
            return;
        }

        if (Character.isLetter(chars[index])) {
            char original = chars[index];

            chars[index] = Character.toLowerCase(original);
            backtrack(index + 1);

            chars[index] = Character.toUpperCase(original);
            backtrack(index + 1);

            chars[index] = original;
        } else {
            backtrack(index + 1);
        }
    }
}
