import java.util.*;

class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        int[] counts = new int[1001];
        for (int x : arr1) counts[x]++;

        int[] result = new int[arr1.length];
        int idx = 0;

        for (int x : arr2) {
            for (int i = 0; i < counts[x]; i++) {
                result[idx++] = x;
            }
            counts[x] = 0;
        }

        for (int v = 0; v <= 1000; v++) {
            for (int i = 0; i < counts[v]; i++) {
                result[idx++] = v;
            }
        }

        return result;
    }
}
