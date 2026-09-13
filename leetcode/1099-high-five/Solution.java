import java.util.*;

class Solution {
    public int[][] highFive(int[][] items) {
        Map<Integer, PriorityQueue<Integer>> heaps = new TreeMap<>();

        for (int[] item : items) {
            int studentId = item[0], score = item[1];
            PriorityQueue<Integer> heap = heaps.computeIfAbsent(studentId, k -> new PriorityQueue<>());
            heap.add(score);
            if (heap.size() > 5) {
                heap.poll();
            }
        }

        int[][] result = new int[heaps.size()][2];
        int idx = 0;
        for (Map.Entry<Integer, PriorityQueue<Integer>> entry : heaps.entrySet()) {
            int sum = 0;
            for (int score : entry.getValue()) {
                sum += score;
            }
            result[idx][0] = entry.getKey();
            result[idx][1] = sum / 5;
            idx++;
        }

        return result;
    }
}
