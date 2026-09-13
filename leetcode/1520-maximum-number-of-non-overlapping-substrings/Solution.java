import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    public List<String> maxNumOfSubstrings(String s) {
        int[] first = new int[26];
        int[] last = new int[26];
        Arrays.fill(first, -1);
        for (int i = 0; i < s.length(); i++) {
            int c = s.charAt(i) - 'a';
            if (first[c] == -1) {
                first[c] = i;
            }
            last[c] = i;
        }

        List<int[]> intervals = new ArrayList<>();
        for (int i = 0; i < s.length(); i++) {
            int c = s.charAt(i) - 'a';
            if (first[c] != i) {
                continue;
            }

            int end = last[c];
            int j = i;
            boolean valid = true;
            while (j <= end) {
                int cj = s.charAt(j) - 'a';
                if (first[cj] < i) {
                    valid = false;
                    break;
                }
                end = Math.max(end, last[cj]);
                j++;
            }

            if (valid) {
                intervals.add(new int[]{i, end});
            }
        }

        intervals.sort((a, b) -> a[1] - b[1]);
        List<String> result = new ArrayList<>();
        int prevEnd = -1;
        for (int[] interval : intervals) {
            if (interval[0] > prevEnd) {
                result.add(s.substring(interval[0], interval[1] + 1));
                prevEnd = interval[1];
            }
        }

        return result;
    }
}
