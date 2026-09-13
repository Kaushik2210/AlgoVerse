import java.util.PriorityQueue;
import java.util.Collections;

class Solution {
    public int lastStoneWeight(int[] stones) {
        PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());
        for (int s : stones) heap.add(s);

        while (heap.size() > 1) {
            int y = heap.poll();
            int x = heap.poll();
            if (y != x) {
                heap.add(y - x);
            }
        }

        return heap.isEmpty() ? 0 : heap.poll();
    }
}
