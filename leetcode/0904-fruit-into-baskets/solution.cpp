#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int totalFruit(vector<int>& fruits) {
        unordered_map<int, int> count;
        int left = 0;
        int best = 0;
        for (int right = 0; right < (int)fruits.size(); right++) {
            count[fruits[right]]++;
            while ((int)count.size() > 2) {
                int leftFruit = fruits[left];
                if (--count[leftFruit] == 0) {
                    count.erase(leftFruit);
                }
                left++;
            }
            best = max(best, right - left + 1);
        }
        return best;
    }
};
