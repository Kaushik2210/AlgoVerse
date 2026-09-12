import java.util.Deque;
import java.util.ArrayDeque;

class HitCounter {
    private final Deque<Integer> hits;

    public HitCounter() {
        hits = new ArrayDeque<>();
    }

    public void hit(int timestamp) {
        hits.addLast(timestamp);
    }

    public int getHits(int timestamp) {
        while (!hits.isEmpty() && hits.peekFirst() <= timestamp - 300) {
            hits.pollFirst();
        }
        return hits.size();
    }
}

/**
 * Your HitCounter object will be instantiated and called as such:
 * HitCounter obj = new HitCounter();
 * obj.hit(timestamp);
 * int param_2 = obj.getHits(timestamp);
 */
