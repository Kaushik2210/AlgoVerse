#include <deque>
#include <string>
#include <unordered_set>
#include <vector>
using namespace std;

class SnakeGame {
public:
    SnakeGame(int width, int height, vector<vector<int>>& food)
        : width(width), height(height), food(food), foodIndex(0), score(0) {
        body.push_back({0, 0});
        bodySet.insert(encode(0, 0));
    }

    int move(string direction) {
        auto [headR, headC] = body.back();
        int newR = headR, newC = headC;
        if (direction == "U") newR--;
        else if (direction == "D") newR++;
        else if (direction == "L") newC--;
        else if (direction == "R") newC++;

        if (newR < 0 || newR >= height || newC < 0 || newC >= width) {
            return -1;
        }

        bool eatsFood = foodIndex < (int)food.size()
                        && food[foodIndex][0] == newR && food[foodIndex][1] == newC;

        auto [tailR, tailC] = body.front();
        long long newKey = encode(newR, newC);
        bool isTail = (tailR == newR && tailC == newC);
        if (bodySet.count(newKey) && !(isTail && !eatsFood)) {
            return -1;
        }

        body.push_back({newR, newC});
        bodySet.insert(newKey);

        if (eatsFood) {
            foodIndex++;
            score++;
        } else {
            auto [oldR, oldC] = body.front();
            body.pop_front();
            bodySet.erase(encode(oldR, oldC));
        }

        return score;
    }

private:
    int width, height;
    vector<vector<int>> food;
    int foodIndex;
    int score;
    deque<pair<int, int>> body;   // front = tail, back = head
    unordered_set<long long> bodySet;

    long long encode(int r, int c) {
        return (long long)r * 100000 + c;
    }
};

/**
 * Your SnakeGame object will be instantiated and called as such:
 * SnakeGame* obj = new SnakeGame(width, height, food);
 * int param_1 = obj->move(direction);
 */
