import java.util.Arrays;
import java.util.Collections;
import java.util.PriorityQueue;

class Solution {
    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        int n = profits.length;
        Integer[] indices = new Integer[n];
        for (int i = 0; i < n; i++) {
            indices[i] = i;
        }
        Arrays.sort(indices, (a, b) -> capital[a] - capital[b]);

        PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());
        int idx = 0;

        for (int round = 0; round < k; round++) {
            while (idx < n && capital[indices[idx]] <= w) {
                heap.add(profits[indices[idx]]);
                idx++;
            }

            if (heap.isEmpty()) {
                break;
            }

            w += heap.poll();
        }

        return w;
    }
}
