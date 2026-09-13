import java.util.ArrayList;
import java.util.List;

class MyCalendarTwo {
    private final List<int[]> bookings;
    private final List<int[]> overlaps;

    public MyCalendarTwo() {
        bookings = new ArrayList<>();
        overlaps = new ArrayList<>();
    }

    public boolean book(int start, int end) {
        for (int[] o : overlaps) {
            if (start < o[1] && o[0] < end) {
                return false;
            }
        }

        for (int[] b : bookings) {
            int os = Math.max(start, b[0]);
            int oe = Math.min(end, b[1]);
            if (os < oe) {
                overlaps.add(new int[]{os, oe});
            }
        }

        bookings.add(new int[]{start, end});
        return true;
    }
}

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * MyCalendarTwo obj = new MyCalendarTwo();
 * boolean param_1 = obj.book(start,end);
 */
