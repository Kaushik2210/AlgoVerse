class Solution {
    public int removeDuplicates(int[] nums) {
        int write = 0;

        for (int read = 0; read < nums.length; read++) {
            if (write < 2 || nums[read] != nums[write - 2]) {
                nums[write] = nums[read];
                write++;
            }
        }

        return write;
    }
}
