/**
 * // This is the ArrayReader's API interface.
 * // You should not implement it, or speculate about its implementation
 * interface ArrayReader {
 *     public int get(int index) {}
 * }
 */

class Solution {
    public int search(ArrayReader reader, int target) {
        int bound = 1;
        while (reader.get(bound) < target) {
            bound *= 2;
        }

        int lo = bound / 2, hi = bound;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int val = reader.get(mid);
            if (val == target) {
                return mid;
            } else if (val < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return -1;
    }
}
