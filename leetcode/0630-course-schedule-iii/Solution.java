import java.util.Arrays;
import java.util.Collections;
import java.util.PriorityQueue;

class Solution {
    public int scheduleCourse(int[][] courses) {
        Arrays.sort(courses, (a, b) -> a[1] - b[1]);

        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        long totalTime = 0;

        for (int[] course : courses) {
            int duration = course[0];
            int deadline = course[1];

            maxHeap.offer(duration);
            totalTime += duration;

            if (totalTime > deadline) {
                totalTime -= maxHeap.poll();
            }
        }

        return maxHeap.size();
    }
}
