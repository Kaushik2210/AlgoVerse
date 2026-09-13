import java.util.HashMap;
import java.util.Map;

class Solution {
    private final Map<Integer, int[]> memo = new HashMap<>();

    public int[] beautifulArray(int n) {
        memo.put(1, new int[]{1});
        return build(n);
    }

    private int[] build(int n) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        // Split into an "odd-transformed" half and an "even-transformed"
        // half. Any beautiful sub-array, when mapped through 2x-1 (all
        // odd results) or 2x (all even results), stays beautiful -- and
        // gluing an all-odd sequence to an all-even one can never create
        // a new violation, since an odd number and an even number can
        // never average to an integer strictly between them.
        int[] oddsSrc = build((n + 1) / 2);
        int[] evensSrc = build(n / 2);

        int[] result = new int[n];
        int idx = 0;
        for (int x : oddsSrc) {
            result[idx++] = 2 * x - 1;
        }
        for (int x : evensSrc) {
            result[idx++] = 2 * x;
        }

        memo.put(n, result);
        return result;
    }
}
