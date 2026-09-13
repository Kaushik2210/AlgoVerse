import java.util.HashSet;
import java.util.Set;

/**
 * // This is the robot's control interface.
 * // You should not implement it, or speculate about its implementation
 * interface Robot {
 *     // Returns true if the cell in front is open and robot moves into the cell.
 *     // Returns false if the cell in front is blocked and robot stays in the current cell.
 *     public boolean move();
 *
 *     // Robot will stay in the same cell after calling turnLeft/turnRight.
 *     // Each turn will be 90 degrees.
 *     public void turnLeft();
 *     public void turnRight();
 *
 *     // Clean the current cell.
 *     public void clean();
 * }
 */
class Solution {
    // facing order matches clockwise turns: up, right, down, left
    private final int[][] directions = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    private final Set<String> visited = new HashSet<>();

    public void cleanRoom(Robot robot) {
        dfs(robot, 0, 0, 0);
    }

    private void dfs(Robot robot, int r, int c, int d) {
        visited.add(r + "," + c);
        robot.clean();

        for (int i = 0; i < 4; i++) {
            int newD = (d + i) % 4;
            int nr = r + directions[newD][0];
            int nc = c + directions[newD][1];

            if (!visited.contains(nr + "," + nc) && robot.move()) {
                dfs(robot, nr, nc, newD);
                goBack(robot);
            }

            robot.turnRight();
        }
    }

    private void goBack(Robot robot) {
        robot.turnRight();
        robot.turnRight();
        robot.move();
        robot.turnRight();
        robot.turnRight();
    }
}
