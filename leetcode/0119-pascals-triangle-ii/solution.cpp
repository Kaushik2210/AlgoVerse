#include <vector>
using namespace std;

class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<long long> row(rowIndex + 1, 1);
        for (int j = 1; j <= rowIndex; j++) {
            row[j] = row[j - 1] * (rowIndex - j + 1) / j;
        }
        return vector<int>(row.begin(), row.end());
    }
};
