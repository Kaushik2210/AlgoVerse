import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public double[] getCollisionTimes(int[][] cars) {
        int n = cars.length;
        double[] ans = new double[n];
        Deque<Integer> stack = new ArrayDeque<>(); // candidate obstacles ahead

        for (int i = n - 1; i >= 0; i--) {
            int posI = cars[i][0], speedI = cars[i][1];

            while (!stack.isEmpty()) {
                int j = stack.peek();
                int posJ = cars[j][0], speedJ = cars[j][1];

                if (speedI <= speedJ) {
                    // i can never catch j
                    stack.pop();
                    continue;
                }

                double timeToJ = (double) (posJ - posI) / (speedI - speedJ);
                if (ans[j] != -1.0 && timeToJ >= ans[j]) {
                    // j gets absorbed by whoever's ahead of it before i arrives
                    stack.pop();
                    continue;
                }

                break;
            }

            if (stack.isEmpty()) {
                ans[i] = -1.0;
            } else {
                int j = stack.peek();
                int posJ = cars[j][0], speedJ = cars[j][1];
                ans[i] = (double) (posJ - posI) / (speedI - speedJ);
            }

            stack.push(i);
        }

        return ans;
    }
}
