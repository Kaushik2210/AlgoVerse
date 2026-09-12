import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

class Solution {
    private int[] nums;
    private List<List<Integer>> result;
    private List<Integer> path;

    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        this.nums = nums;
        this.result = new ArrayList<>();
        this.path = new ArrayList<>();

        backtrack(0);
        return result;
    }

    private void backtrack(int start) {
        result.add(new ArrayList<>(path));

        for (int i = start; i < nums.length; i++) {
            if (i > start && nums[i] == nums[i - 1]) {
                continue;
            }
            path.add(nums[i]);
            backtrack(i + 1);
            path.remove(path.size() - 1);
        }
    }
}
