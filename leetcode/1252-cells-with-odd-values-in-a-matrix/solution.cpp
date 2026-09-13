#include <vector>
using namespace std;

class Solution {
public:
    int oddCells(int m, int n, vector<vector<int>>& indices) {
        vector<int> rowCount(m, 0), colCount(n, 0);
        for (auto& idx : indices) {
            rowCount[idx[0]]++;
            colCount[idx[1]]++;
        }

        int oddRows = 0, oddCols = 0;
        for (int x : rowCount) if (x % 2 == 1) oddRows++;
        for (int x : colCount) if (x % 2 == 1) oddCols++;
        int evenRows = m - oddRows;
        int evenCols = n - oddCols;

        return oddRows * evenCols + evenRows * oddCols;
    }
};
