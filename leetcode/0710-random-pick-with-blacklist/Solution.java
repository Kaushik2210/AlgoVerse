import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Random;
import java.util.Set;

class Solution {
    private final int bound;
    private final Map<Integer, Integer> remap = new HashMap<>();
    private final Random rand = new Random();

    public Solution(int n, int[] blacklist) {
        bound = n - blacklist.length;
        Set<Integer> blacklisted = new HashSet<>();
        for (int b : blacklist) blacklisted.add(b);

        int nextWhitelisted = bound;
        for (int b : blacklist) {
            if (b < bound) {
                while (blacklisted.contains(nextWhitelisted)) {
                    nextWhitelisted++;
                }
                remap.put(b, nextWhitelisted);
                nextWhitelisted++;
            }
        }
    }

    public int pick() {
        int x = rand.nextInt(bound);
        return remap.getOrDefault(x, x);
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(n, blacklist);
 * int param_1 = obj.pick();
 */
