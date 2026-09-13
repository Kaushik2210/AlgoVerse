#include <string>
#include <queue>
#include <vector>
using namespace std;

class Solution {
public:
    string longestDiverseString(int a, int b, int c) {
        priority_queue<pair<int, char>> heap;
        if (a > 0) heap.push({a, 'a'});
        if (b > 0) heap.push({b, 'b'});
        if (c > 0) heap.push({c, 'c'});

        string result;
        while (!heap.empty()) {
            auto [count, ch] = heap.top();
            heap.pop();
            int n = result.size();
            if (n >= 2 && result[n - 1] == ch && result[n - 2] == ch) {
                if (heap.empty()) break;
                auto [count2, ch2] = heap.top();
                heap.pop();
                result += ch2;
                count2--;
                if (count2 > 0) heap.push({count2, ch2});
                heap.push({count, ch});
            } else {
                result += ch;
                count--;
                if (count > 0) heap.push({count, ch});
            }
        }
        return result;
    }
};
