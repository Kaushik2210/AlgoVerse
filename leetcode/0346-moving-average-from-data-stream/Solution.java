import java.util.Deque;
import java.util.ArrayDeque;

class MovingAverage {
    private final int size;
    private final Deque<Integer> window;
    private long total;

    public MovingAverage(int size) {
        this.size = size;
        this.window = new ArrayDeque<>();
        this.total = 0;
    }

    public double next(int val) {
        window.addLast(val);
        total += val;

        if (window.size() > size) {
            total -= window.pollFirst();
        }

        return (double) total / window.size();
    }
}

/**
 * Your MovingAverage object will be instantiated and called as such:
 * MovingAverage obj = new MovingAverage(size);
 * double param_1 = obj.next(val);
 */
