import java.util.ArrayList;
import java.util.List;

class Solution {
    private final List<List<Integer>> result = new ArrayList<>();
    private final List<Integer> path = new ArrayList<>();

    public List<List<Integer>> combinationSum3(int k, int n) {
        backtrack(1, k, n);
        return result;
    }

    private void backtrack(int start, int remainingCount, int remainingSum) {
        if (remainingCount == 0) {
            if (remainingSum == 0) {
                result.add(new ArrayList<>(path));
            }
            return;
        }

        if (remainingSum <= 0) {
            return;
        }

        for (int candidate = start; candidate <= 9; candidate++) {
            if (candidate > remainingSum) {
                break;
            }

            path.add(candidate);
            backtrack(candidate + 1, remainingCount - 1, remainingSum - candidate);
            path.remove(path.size() - 1);
        }
    }
}
