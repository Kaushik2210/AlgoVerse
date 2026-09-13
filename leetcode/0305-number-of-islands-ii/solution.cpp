#include <vector>
using namespace std;

class Solution {
    vector<int> parent, rankArr;

    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    bool unite(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;
        if (rankArr[ra] < rankArr[rb]) swap(ra, rb);
        parent[rb] = ra;
        if (rankArr[ra] == rankArr[rb]) rankArr[ra]++;
        return true;
    }

public:
    vector<int> numIslands2(int m, int n, vector<vector<int>>& positions) {
        parent.resize(m * n);
        rankArr.assign(m * n, 0);
        for (int i = 0; i < m * n; i++) parent[i] = i;

        vector<vector<bool>> isLand(m, vector<bool>(n, false));
        int islandCount = 0;
        vector<int> result;
        int directions[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        for (auto& pos : positions) {
            int r = pos[0], c = pos[1];
            if (isLand[r][c]) {
                result.push_back(islandCount);
                continue;
            }

            isLand[r][c] = true;
            islandCount++;

            for (auto& d : directions) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && isLand[nr][nc]) {
                    if (unite(r * n + c, nr * n + nc)) {
                        islandCount--;
                    }
                }
            }

            result.push_back(islandCount);
        }

        return result;
    }
};
