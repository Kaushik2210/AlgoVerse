import java.util.HashMap;
import java.util.Map;

class Solution {
    private Map<Long, Long> memo = new HashMap<>();

    public int minDays(int n) {
        return (int) f(n);
    }

    private long f(long n) {
        if (n <= 1) return n;
        if (memo.containsKey(n)) return memo.get(n);
        long result = 1 + Math.min(n % 2 + f(n / 2), n % 3 + f(n / 3));
        memo.put(n, result);
        return result;
    }
}
