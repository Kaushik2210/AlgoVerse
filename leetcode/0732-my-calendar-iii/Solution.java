import java.util.TreeMap;

class MyCalendarThree {
    private final TreeMap<Integer, Integer> deltas;

    public MyCalendarThree() {
        deltas = new TreeMap<>();
    }

    public int book(int start, int end) {
        deltas.merge(start, 1, Integer::sum);
        deltas.merge(end, -1, Integer::sum);

        int active = 0, best = 0;
        for (int delta : deltas.values()) {
            active += delta;
            best = Math.max(best, active);
        }
        return best;
    }
}

/**
 * Your MyCalendarThree object will be instantiated and called as such:
 * MyCalendarThree obj = new MyCalendarThree();
 * int param_1 = obj.book(start,end);
 */
