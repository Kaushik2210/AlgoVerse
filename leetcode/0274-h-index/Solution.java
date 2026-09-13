import java.util.Arrays;
import java.util.Collections;

class Solution {
    public int hIndex(int[] citations) {
        Integer[] boxed = new Integer[citations.length];
        for (int i = 0; i < citations.length; i++) boxed[i] = citations[i];
        Arrays.sort(boxed, Collections.reverseOrder());

        int h = 0;
        for (int i = 0; i < boxed.length; i++) {
            if (boxed[i] >= i + 1) {
                h = i + 1;
            } else {
                break;
            }
        }
        return h;
    }
}
