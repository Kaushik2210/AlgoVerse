import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<Integer> sequentialDigits(int low, int high) {
        String digits = "123456789";
        List<Integer> result = new ArrayList<>();
        int minLen = Integer.toString(low).length();
        int maxLen = Integer.toString(high).length();

        for (int length = minLen; length <= maxLen; length++) {
            for (int start = 0; start <= 9 - length; start++) {
                int num = Integer.parseInt(digits.substring(start, start + length));
                if (num >= low && num <= high) {
                    result.add(num);
                }
            }
        }

        return result;
    }
}
