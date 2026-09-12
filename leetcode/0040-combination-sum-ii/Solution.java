import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

class Solution {
    private int[] candidates;
    private List<List<Integer>> result;
    private List<Integer> path;

    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        this.candidates = candidates;
        this.result = new ArrayList<>();
        this.path = new ArrayList<>();

        backtrack(0, target);
        return result;
    }

    private void backtrack(int start, int remaining) {
        if (remaining == 0) {
            result.add(new ArrayList<>(path));
            return;
        }

        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) {
                break;
            }
            if (i > start && candidates[i] == candidates[i - 1]) {
                continue;
            }

            path.add(candidates[i]);
            backtrack(i + 1, remaining - candidates[i]);
            path.remove(path.size() - 1);
        }
    }
}
