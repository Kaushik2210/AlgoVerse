#include <queue>
#include <unordered_map>
using namespace std;

class Leaderboard {
    unordered_map<int, int> scores;

public:
    Leaderboard() {}

    void addScore(int playerId, int score) {
        scores[playerId] += score;
    }

    int top(int K) {
        // min-heap of size K holding the current K largest scores seen so far
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (auto& [id, score] : scores) {
            minHeap.push(score);
            if ((int)minHeap.size() > K) {
                minHeap.pop();
            }
        }
        int sum = 0;
        while (!minHeap.empty()) {
            sum += minHeap.top();
            minHeap.pop();
        }
        return sum;
    }

    void reset(int playerId) {
        scores.erase(playerId);
    }
};

/**
 * Your Leaderboard object will be instantiated and called as such:
 * Leaderboard* obj = new Leaderboard();
 * obj->addScore(playerId,score);
 * int param_2 = obj->top(K);
 * obj->reset(playerId);
 */
