import java.util.HashMap;
import java.util.Map;

class Solution {
    public boolean isStrobogrammatic(String num) {
        Map<Character, Character> pairs = new HashMap<>();
        pairs.put('0', '0');
        pairs.put('1', '1');
        pairs.put('6', '9');
        pairs.put('8', '8');
        pairs.put('9', '6');

        int left = 0, right = num.length() - 1;
        while (left <= right) {
            char l = num.charAt(left);
            if (!pairs.containsKey(l) || pairs.get(l) != num.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }

        return true;
    }
}
