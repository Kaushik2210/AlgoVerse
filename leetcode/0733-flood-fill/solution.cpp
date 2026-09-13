#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        int original = image[sr][sc];
        if (original == color) {
            return image;
        }

        int rows = (int)image.size(), cols = (int)image[0].size();
        vector<pair<int,int>> stack;
        stack.push_back({sr, sc});
        image[sr][sc] = color;

        int dr[] = {1, -1, 0, 0};
        int dc[] = {0, 0, 1, -1};
        while (!stack.empty()) {
            auto [r, c] = stack.back();
            stack.pop_back();
            for (int i = 0; i < 4; i++) {
                int nr = r + dr[i], nc = c + dc[i];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && image[nr][nc] == original) {
                    image[nr][nc] = color;
                    stack.push_back({nr, nc});
                }
            }
        }

        return image;
    }
};
