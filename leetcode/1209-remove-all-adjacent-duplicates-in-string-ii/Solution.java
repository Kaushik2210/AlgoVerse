import java.util.ArrayList;
import java.util.List;

class Solution {
    public String removeDuplicates(String s, int k) {
        List<int[]> stack = new ArrayList<>(); // each entry: [char, count]
        for (char ch : s.toCharArray()) {
            if (!stack.isEmpty() && stack.get(stack.size() - 1)[0] == ch) {
                stack.get(stack.size() - 1)[1]++;
            } else {
                stack.add(new int[]{ch, 1});
            }
            if (stack.get(stack.size() - 1)[1] == k) {
                stack.remove(stack.size() - 1);
            }
        }

        StringBuilder sb = new StringBuilder();
        for (int[] entry : stack) {
            for (int i = 0; i < entry[1]; i++) {
                sb.append((char) entry[0]);
            }
        }
        return sb.toString();
    }
}
