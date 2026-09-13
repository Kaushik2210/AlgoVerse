import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {
    public int[] numsSameConsecDiff(int n, int k) {
        List<Integer> current = new ArrayList<>();
        for (int d = 1; d <= 9; d++) {
            current.add(d);
        }

        for (int level = 1; level < n; level++) {
            List<Integer> nextLevel = new ArrayList<>();
            for (int num : current) {
                int lastDigit = num % 10;
                Set<Integer> diffs = new HashSet<>();
                diffs.add(k);
                diffs.add(-k);
                for (int diff : diffs) {
                    int newDigit = lastDigit + diff;
                    if (newDigit >= 0 && newDigit <= 9) {
                        nextLevel.add(num * 10 + newDigit);
                    }
                }
            }
            current = nextLevel;
        }

        int[] result = new int[current.size()];
        for (int i = 0; i < current.size(); i++) {
            result[i] = current.get(i);
        }
        return result;
    }
}
