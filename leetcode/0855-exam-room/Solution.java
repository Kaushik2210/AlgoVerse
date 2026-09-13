import java.util.TreeSet;

class ExamRoom {
    private final int n;
    private final TreeSet<Integer> seats;

    public ExamRoom(int n) {
        this.n = n;
        this.seats = new TreeSet<>();
    }

    public int seat() {
        int chosen = 0;

        if (!seats.isEmpty()) {
            int bestDist = seats.first();
            chosen = 0;

            Integer prev = null;
            for (int cur : seats) {
                if (prev != null) {
                    int dist = (cur - prev) / 2;
                    if (dist > bestDist) {
                        bestDist = dist;
                        chosen = prev + dist;
                    }
                }
                prev = cur;
            }

            int lastDist = n - 1 - seats.last();
            if (lastDist > bestDist) {
                chosen = n - 1;
            }
        }

        seats.add(chosen);
        return chosen;
    }

    public void leave(int p) {
        seats.remove(p);
    }
}
