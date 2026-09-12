import java.util.Map;

class Solution {
    public int romanToInt(String s) {
        Map<Character, Integer> values = Map.of(
            'I', 1, 'V', 5, 'X', 10, 'L', 50,
            'C', 100, 'D', 500, 'M', 1000
        );

        int total = 0;
        int n = s.length();
        for (int i = 0; i < n; i++) {
            int curr = values.get(s.charAt(i));
            if (i + 1 < n && curr < values.get(s.charAt(i + 1))) {
                total -= curr;
            } else {
                total += curr;
            }
        }

        return total;
    }
}
