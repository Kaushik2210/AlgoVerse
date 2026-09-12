import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> result = new ArrayList<>();
        LinkedList<Integer> combo = new LinkedList<>();
        backtrack(1, n, k, combo, result);
        return result;
    }

    private void backtrack(int start, int n, int k, LinkedList<Integer> combo, List<List<Integer>> result) {
        if (combo.size() == k) {
            result.add(new ArrayList<>(combo));
            return;
        }

        for (int num = start; num <= n; num++) {
            combo.addLast(num);
            backtrack(num + 1, n, k, combo, result);
            combo.removeLast();
        }
    }
}
