#include <vector>
using namespace std;

class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        vector<int> counts(1001, 0);
        for (int x : arr1) counts[x]++;

        vector<int> result;
        result.reserve(arr1.size());

        for (int x : arr2) {
            for (int i = 0; i < counts[x]; i++) {
                result.push_back(x);
            }
            counts[x] = 0;
        }

        for (int v = 0; v <= 1000; v++) {
            for (int i = 0; i < counts[v]; i++) {
                result.push_back(v);
            }
        }

        return result;
    }
};
