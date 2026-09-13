import java.util.PriorityQueue;

class Solution {
    public int connectSticks(int[] sticks) {
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int s : sticks) heap.add(s);

        int total = 0;
        while (heap.size() > 1) {
            int a = heap.poll();
            int b = heap.poll();
            int cost = a + b;
            total += cost;
            heap.add(cost);
        }
        return total;
    }
}
