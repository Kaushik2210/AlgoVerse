#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> result;
        result.push_back({1});

        for (int i = 1; i < numRows; i++) {
            const vector<int>& prevRow = result[i - 1];
            vector<int> row;
            row.push_back(1);
            for (int j = 1; j < i; j++) {
                row.push_back(prevRow[j - 1] + prevRow[j]);
            }
            row.push_back(1);
            result.push_back(row);
        }

        return result;
    }
};
