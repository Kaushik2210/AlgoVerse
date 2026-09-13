import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class Leaderboard {
    private final Map<Integer, Integer> scores = new HashMap<>();

    public Leaderboard() {
    }

    public void addScore(int playerId, int score) {
        scores.merge(playerId, score, Integer::sum);
    }

    public int top(int K) {
        // min-heap of size K holding the current K largest scores seen so far
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int score : scores.values()) {
            minHeap.offer(score);
            if (minHeap.size() > K) {
                minHeap.poll();
            }
        }
        int sum = 0;
        for (int score : minHeap) {
            sum += score;
        }
        return sum;
    }

    public void reset(int playerId) {
        scores.remove(playerId);
    }
}

/**
 * Your Leaderboard object will be instantiated and called as such:
 * Leaderboard obj = new Leaderboard();
 * obj.addScore(playerId,score);
 * int param_2 = obj.top(K);
 * obj.reset(playerId);
 */
