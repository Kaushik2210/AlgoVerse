import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

class SnakeGame {
    private final int width;
    private final int height;
    private final int[][] food;
    private int foodIndex;
    private int score;
    private final Deque<long[]> body;   // head at the back, tail at the front; each cell is {row, col}
    private final Set<Long> bodySet;

    public SnakeGame(int width, int height, int[][] food) {
        this.width = width;
        this.height = height;
        this.food = food;
        this.foodIndex = 0;
        this.score = 0;
        this.body = new ArrayDeque<>();
        this.body.add(new long[]{0, 0});
        this.bodySet = new HashSet<>();
        this.bodySet.add(encode(0, 0));
    }

    private long encode(long r, long c) {
        return r * 100000 + c;
    }

    public int move(String direction) {
        long[] head = body.peekLast();
        long newR = head[0], newC = head[1];
        switch (direction) {
            case "U": newR--; break;
            case "D": newR++; break;
            case "L": newC--; break;
            case "R": newC++; break;
        }

        if (newR < 0 || newR >= height || newC < 0 || newC >= width) {
            return -1;
        }

        boolean eatsFood = foodIndex < food.length
                && food[foodIndex][0] == newR && food[foodIndex][1] == newC;

        long[] tail = body.peekFirst();
        long newKey = encode(newR, newC);
        boolean isTail = tail[0] == newR && tail[1] == newC;
        if (bodySet.contains(newKey) && !(isTail && !eatsFood)) {
            return -1;
        }

        body.addLast(new long[]{newR, newC});
        bodySet.add(newKey);

        if (eatsFood) {
            foodIndex++;
            score++;
        } else {
            long[] oldTail = body.pollFirst();
            bodySet.remove(encode(oldTail[0], oldTail[1]));
        }

        return score;
    }
}

/**
 * Your SnakeGame object will be instantiated and called as such:
 * SnakeGame obj = new SnakeGame(width, height, food);
 * int param_1 = obj.move(direction);
 */
