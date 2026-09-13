#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minSetSize(vector<int>& arr) {
        unordered_map<int, int> freq;
        for (int x : arr) freq[x]++;

        vector<int> counts;
        for (auto& [val, cnt] : freq) counts.push_back(cnt);
        sort(counts.begin(), counts.end(), greater<int>());

        int n = arr.size();
        int removed = 0;
        for (int i = 0; i < (int)counts.size(); i++) {
            removed += counts[i];
            if (removed * 2 >= n) return i + 1;
        }
        return counts.size();
    }
};
