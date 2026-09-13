#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int connectSticks(vector<int>& sticks) {
        priority_queue<int, vector<int>, greater<int>> heap(sticks.begin(), sticks.end());

        int total = 0;
        while (heap.size() > 1) {
            int a = heap.top(); heap.pop();
            int b = heap.top(); heap.pop();
            int cost = a + b;
            total += cost;
            heap.push(cost);
        }
        return total;
    }
};
