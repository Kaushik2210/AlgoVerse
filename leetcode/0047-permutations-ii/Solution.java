import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

class Solution {
    private int[] nums;
    private boolean[] used;
    private List<List<Integer>> result;
    private List<Integer> path;

    public List<List<Integer>> permuteUnique(int[] nums) {
        Arrays.sort(nums);
        this.nums = nums;
        this.used = new boolean[nums.length];
        this.result = new ArrayList<>();
        this.path = new ArrayList<>();

        backtrack();
        return result;
    }

    private void backtrack() {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            if (used[i]) {
                continue;
            }
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
                continue;
            }

            used[i] = true;
            path.add(nums[i]);
            backtrack();
            path.remove(path.size() - 1);
            used[i] = false;
        }
    }
}
