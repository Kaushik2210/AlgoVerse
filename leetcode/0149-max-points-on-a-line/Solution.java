import java.util.HashMap;
import java.util.Map;

class Solution {
    public int maxPoints(int[][] points) {
        int n = points.length;
        if (n <= 2) {
            return n;
        }

        int best = 1;

        for (int i = 0; i < n; i++) {
            Map<Long, Integer> slopes = new HashMap<>();
            int x1 = points[i][0], y1 = points[i][1];

            for (int j = 0; j < n; j++) {
                if (j == i) continue;
                int x2 = points[j][0], y2 = points[j][1];
                int dx = x2 - x1, dy = y2 - y1;

                long key;
                if (dx == 0) {
                    key = encode(0, 1);
                } else {
                    int g = gcd(dx, dy);
                    dx /= g;
                    dy /= g;
                    if (dx < 0) {
                        dx = -dx;
                        dy = -dy;
                    }
                    key = encode(dx, dy);
                }

                int count = slopes.merge(key, 1, Integer::sum);
                best = Math.max(best, count + 1);
            }
        }

        return best;
    }

    private int gcd(int a, int b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b != 0) {
            int t = b;
            b = a % b;
            a = t;
        }
        return a == 0 ? 1 : a;
    }

    private long encode(int dx, int dy) {
        return ((long) dx << 32) ^ (dy & 0xffffffffL);
    }
}
