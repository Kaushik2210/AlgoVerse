#include <vector>
#include <algorithm>
#include <queue>
using namespace std;

class Solution {
public:
    int scheduleCourse(vector<vector<int>>& courses) {
        sort(courses.begin(), courses.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });

        priority_queue<int> maxHeap; // max-heap of durations taken so far
        long long totalTime = 0;

        for (auto& course : courses) {
            int duration = course[0];
            int deadline = course[1];

            maxHeap.push(duration);
            totalTime += duration;

            if (totalTime > deadline) {
                totalTime -= maxHeap.top();
                maxHeap.pop();
            }
        }

        return (int)maxHeap.size();
    }
};
