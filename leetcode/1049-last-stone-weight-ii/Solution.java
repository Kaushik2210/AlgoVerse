class Solution {
    public int lastStoneWeightII(int[] stones) {
        int total = 0;
        for (int s : stones) total += s;
        int target = total / 2;

        boolean[] reachable = new boolean[target + 1];
        reachable[0] = true;
        for (int s : stones) {
            for (int t = target; t >= s; t--) {
                if (reachable[t - s]) {
                    reachable[t] = true;
                }
            }
        }

        int best = target;
        while (!reachable[best]) best--;

        return total - 2 * best;
    }
}
