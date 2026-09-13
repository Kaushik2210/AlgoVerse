import java.util.ArrayList;
import java.util.List;

class SnapshotArray {
    private int snapId;
    private final List<List<int[]>> history; // history[index] -> list of [snapId, value]

    public SnapshotArray(int length) {
        snapId = 0;
        history = new ArrayList<>();
        for (int i = 0; i < length; i++) {
            List<int[]> hist = new ArrayList<>();
            hist.add(new int[]{0, 0});
            history.add(hist);
        }
    }

    public void set(int index, int val) {
        List<int[]> hist = history.get(index);
        int[] last = hist.get(hist.size() - 1);
        if (last[0] == snapId) {
            last[1] = val;
        } else {
            hist.add(new int[]{snapId, val});
        }
    }

    public int snap() {
        return snapId++;
    }

    public int get(int index, int snap_id) {
        List<int[]> hist = history.get(index);
        int lo = 0, hi = hist.size() - 1, ans = 0;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (hist.get(mid)[0] <= snap_id) {
                ans = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return hist.get(ans)[1];
    }
}

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * SnapshotArray obj = new SnapshotArray(length);
 * obj.set(index,val);
 * int param_2 = obj.snap();
 * int param_3 = obj.get(index,snap_id);
 */
