import java.util.Arrays;

class Solution {
    public int minMeetingRooms(int[][] intervals) {
        if (intervals.length == 0) {
            return 0;
        }

        int n = intervals.length;
        int[] starts = new int[n];
        int[] ends = new int[n];
        for (int i = 0; i < n; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }
        Arrays.sort(starts);
        Arrays.sort(ends);

        int rooms = 0, maxRooms = 0;
        int s = 0, e = 0;

        while (s < n) {
            if (starts[s] < ends[e]) {
                rooms++;
                maxRooms = Math.max(maxRooms, rooms);
                s++;
            } else {
                rooms--;
                e++;
            }
        }

        return maxRooms;
    }
}
