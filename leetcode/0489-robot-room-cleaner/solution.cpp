#include <set>
#include <utility>
using namespace std;

/**
 * // This is the robot's control interface.
 * // You should not implement it, or speculate about its implementation
 * class Robot {
 *   public:
 *     // Returns true if the cell in front is open and robot moves into the cell.
 *     // Returns false if the cell in front is blocked and robot stays in the current cell.
 *     bool move();
 *
 *     // Robot will stay in the same cell after calling turnLeft/turnRight.
 *     // Each turn will be 90 degrees.
 *     void turnLeft();
 *     void turnRight();
 *
 *     // Clean the current cell.
 *     void clean();
 * };
 */

class Solution {
public:
    void cleanRoom(Robot& robot) {
        dfs(robot, 0, 0, 0);
    }

private:
    // facing order matches clockwise turns: up, right, down, left
    int dr[4] = {-1, 0, 1, 0};
    int dc[4] = {0, 1, 0, -1};
    set<pair<int,int>> visited;

    void dfs(Robot& robot, int r, int c, int d) {
        visited.insert({r, c});
        robot.clean();

        for (int i = 0; i < 4; i++) {
            int newD = (d + i) % 4;
            int nr = r + dr[newD];
            int nc = c + dc[newD];

            if (!visited.count({nr, nc}) && robot.move()) {
                dfs(robot, nr, nc, newD);
                goBack(robot);
            }

            robot.turnRight();
        }
    }

    void goBack(Robot& robot) {
        robot.turnRight();
        robot.turnRight();
        robot.move();
        robot.turnRight();
        robot.turnRight();
    }
};
