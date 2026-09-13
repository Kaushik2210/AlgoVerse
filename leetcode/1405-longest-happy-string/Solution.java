import java.util.PriorityQueue;

class Solution {
    public String longestDiverseString(int a, int b, int c) {
        PriorityQueue<int[]> heap = new PriorityQueue<>((x, y) -> y[0] - x[0]);
        if (a > 0) heap.offer(new int[]{a, 'a'});
        if (b > 0) heap.offer(new int[]{b, 'b'});
        if (c > 0) heap.offer(new int[]{c, 'c'});

        StringBuilder result = new StringBuilder();
        while (!heap.isEmpty()) {
            int[] top = heap.poll();
            int n = result.length();
            if (n >= 2 && result.charAt(n - 1) == top[1] && result.charAt(n - 2) == top[1]) {
                if (heap.isEmpty()) break;
                int[] second = heap.poll();
                result.append((char) second[1]);
                second[0]--;
                if (second[0] > 0) heap.offer(second);
                heap.offer(top);
            } else {
                result.append((char) top[1]);
                top[0]--;
                if (top[0] > 0) heap.offer(top);
            }
        }
        return result.toString();
    }
}
