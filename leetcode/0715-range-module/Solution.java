import java.util.ArrayList;
import java.util.List;

class RangeModule {
    private List<int[]> intervals = new ArrayList<>(); // sorted, disjoint, non-adjacent [start, end)

    public RangeModule() {
    }

    public void addRange(int left, int right) {
        List<int[]> newIntervals = new ArrayList<>();
        int i = 0, n = intervals.size();
        while (i < n && intervals.get(i)[1] < left) {
            newIntervals.add(intervals.get(i));
            i++;
        }
        while (i < n && intervals.get(i)[0] <= right) {
            left = Math.min(left, intervals.get(i)[0]);
            right = Math.max(right, intervals.get(i)[1]);
            i++;
        }
        newIntervals.add(new int[]{left, right});
        while (i < n) {
            newIntervals.add(intervals.get(i));
            i++;
        }
        intervals = newIntervals;
    }

    public boolean queryRange(int left, int right) {
        for (int[] interval : intervals) {
            if (interval[0] <= left && right <= interval[1]) {
                return true;
            }
            if (interval[0] > left) {
                break;
            }
        }
        return false;
    }

    public void removeRange(int left, int right) {
        List<int[]> newIntervals = new ArrayList<>();
        for (int[] interval : intervals) {
            int s = interval[0], e = interval[1];
            if (e <= left || s >= right) {
                newIntervals.add(interval);
            } else {
                if (s < left) newIntervals.add(new int[]{s, left});
                if (e > right) newIntervals.add(new int[]{right, e});
            }
        }
        intervals = newIntervals;
    }
}

/**
 * Your RangeModule object will be instantiated and called as such:
 * RangeModule obj = new RangeModule();
 * obj.addRange(left,right);
 * boolean param_2 = obj.queryRange(left,right);
 * obj.removeRange(left,right);
 */
