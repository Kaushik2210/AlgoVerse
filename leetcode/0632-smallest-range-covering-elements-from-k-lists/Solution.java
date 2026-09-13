import java.util.List;
import java.util.PriorityQueue;

class Solution {
    public int[] smallestRange(List<List<Integer>> nums) {
        int k = nums.size();
        // heap holds [value, listIndex, elementIndex] — always the smallest
        // not-yet-consumed value from each list
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]);

        int currentMax = Integer.MIN_VALUE;
        for (int i = 0; i < k; i++) {
            int v = nums.get(i).get(0);
            heap.offer(new int[]{v, i, 0});
            currentMax = Math.max(currentMax, v);
        }

        int bestStart = -1_000_000_000, bestEnd = 1_000_000_000;

        while (true) {
            int[] top = heap.poll();
            int val = top[0], i = top[1], j = top[2];

            if (currentMax - val < bestEnd - bestStart) {
                bestStart = val;
                bestEnd = currentMax;
            }

            if (j + 1 == nums.get(i).size()) {
                break;
            }

            int nextVal = nums.get(i).get(j + 1);
            currentMax = Math.max(currentMax, nextVal);
            heap.offer(new int[]{nextVal, i, j + 1});
        }

        return new int[]{bestStart, bestEnd};
    }
}
