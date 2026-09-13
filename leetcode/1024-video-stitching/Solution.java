class Solution {
    public int videoStitching(int[][] clips, int time) {
        int[] farthest = new int[time];
        for (int[] clip : clips) {
            if (clip[0] < time) {
                farthest[clip[0]] = Math.max(farthest[clip[0]], clip[1]);
            }
        }

        int count = 0;
        int currentEnd = 0;
        int nextEnd = 0;
        int s = 0;
        while (currentEnd < time) {
            while (s <= currentEnd && s < time) {
                nextEnd = Math.max(nextEnd, farthest[s]);
                s++;
            }
            if (nextEnd <= currentEnd) {
                return -1;
            }
            count++;
            currentEnd = nextEnd;
        }
        return count;
    }
}
