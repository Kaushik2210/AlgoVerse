import java.util.ArrayList;
import java.util.List;

class Solution {
    public String getPermutation(int n, int k) {
        List<Integer> digits = new ArrayList<>();
        for (int d = 1; d <= n; d++) {
            digits.add(d);
        }

        int[] factorial = new int[n + 1];
        factorial[0] = 1;
        for (int i = 1; i <= n; i++) {
            factorial[i] = factorial[i - 1] * i;
        }

        k -= 1; // switch to 0-indexed rank
        StringBuilder result = new StringBuilder();

        for (int i = n; i >= 1; i--) {
            int blockSize = factorial[i - 1];
            int index = k / blockSize;
            k %= blockSize;

            result.append(digits.remove(index));
        }

        return result.toString();
    }
}
