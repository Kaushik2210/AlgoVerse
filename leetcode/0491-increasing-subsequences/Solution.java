import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {
    private final List<List<Integer>> result = new ArrayList<>();
    private final List<Integer> path = new ArrayList<>();
    private int[] nums;

    public List<List<Integer>> findSubsequences(int[] nums) {
        this.nums = nums;
        backtrack(0);
        return result;
    }

    private void backtrack(int start) {
        if (path.size() >= 2) {
            result.add(new ArrayList<>(path));
        }

        Set<Integer> seenThisLevel = new HashSet<>();
        for (int i = start; i < nums.length; i++) {
            if (seenThisLevel.contains(nums[i])) {
                continue;
            }
            if (!path.isEmpty() && nums[i] < path.get(path.size() - 1)) {
                continue;
            }
            seenThisLevel.add(nums[i]);
            path.add(nums[i]);
            backtrack(i + 1);
            path.remove(path.size() - 1);
        }
    }
}
