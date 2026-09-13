class Solution {
    private boolean[] used;
    private int count;
    private int n;

    public int countArrangement(int n) {
        this.n = n;
        this.used = new boolean[n + 1];
        this.count = 0;
        backtrack(1);
        return count;
    }

    private void backtrack(int pos) {
        if (pos > n) {
            count++;
            return;
        }
        for (int num = 1; num <= n; num++) {
            if (!used[num] && (num % pos == 0 || pos % num == 0)) {
                used[num] = true;
                backtrack(pos + 1);
                used[num] = false;
            }
        }
    }
}
