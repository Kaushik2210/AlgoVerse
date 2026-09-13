class Solution {
    public int minNumberOfFrogs(String croakOfFrogs) {
        String order = "croak";
        int[] idx = new int[128];
        for (int i = 0; i < order.length(); i++) {
            idx[order.charAt(i)] = i;
        }
        int[] count = new int[5];
        int busy = 0;
        int maxBusy = 0;

        for (int p = 0; p < croakOfFrogs.length(); p++) {
            char ch = croakOfFrogs.charAt(p);
            if (order.indexOf(ch) == -1) {
                return -1;
            }
            int i = idx[ch];
            if (i == 0) {
                count[0]++;
                busy++;
                maxBusy = Math.max(maxBusy, busy);
            } else {
                if (count[i - 1] == 0) {
                    return -1;
                }
                count[i - 1]--;
                count[i]++;
                if (i == 4) {
                    count[4]--;
                    busy--;
                }
            }
        }

        for (int i = 0; i < 4; i++) {
            if (count[i] != 0) {
                return -1;
            }
        }
        return maxBusy;
    }
}
