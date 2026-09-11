#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> heap; // min-heap
        for (int n : nums) {
            heap.push(n);
            if ((int)heap.size() > k) {
                heap.pop();
            }
        }
        return heap.top();
    }
};
