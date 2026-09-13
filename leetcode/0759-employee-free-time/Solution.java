import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// Definition for an Interval.
class Interval {
    public int start;
    public int end;

    public Interval() {}

    public Interval(int start, int end) {
        this.start = start;
        this.end = end;
    }
}

class Solution {
    public List<Interval> employeeFreeTime(List<List<Interval>> schedule) {
        List<Interval> intervals = new ArrayList<>();
        for (List<Interval> employee : schedule) {
            intervals.addAll(employee);
        }
        Collections.sort(intervals, (a, b) -> a.start - b.start);

        List<Interval> merged = new ArrayList<>();
        for (Interval iv : intervals) {
            if (!merged.isEmpty() && iv.start <= merged.get(merged.size() - 1).end) {
                Interval last = merged.get(merged.size() - 1);
                last.end = Math.max(last.end, iv.end);
            } else {
                merged.add(new Interval(iv.start, iv.end));
            }
        }

        List<Interval> free = new ArrayList<>();
        for (int i = 1; i < merged.size(); i++) {
            if (merged.get(i - 1).end < merged.get(i).start) {
                free.add(new Interval(merged.get(i - 1).end, merged.get(i).start));
            }
        }
        return free;
    }
}
