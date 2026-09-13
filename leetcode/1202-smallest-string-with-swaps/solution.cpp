#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> parent;

    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    void unite(int a, int b) {
        int ra = find(a);
        int rb = find(b);
        if (ra != rb) {
            parent[ra] = rb;
        }
    }

    string smallestStringWithSwaps(string s, vector<vector<int>>& pairs) {
        int n = s.size();
        parent.resize(n);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }

        for (auto& pair : pairs) {
            unite(pair[0], pair[1]);
        }

        unordered_map<int, vector<int>> groups;
        for (int i = 0; i < n; i++) {
            groups[find(i)].push_back(i);
        }

        string result = s;
        for (auto& [root, indices] : groups) {
            vector<int> sortedIndices = indices;
            sort(sortedIndices.begin(), sortedIndices.end());

            string chars;
            for (int i : sortedIndices) {
                chars += result[i];
            }
            sort(chars.begin(), chars.end());

            for (size_t k = 0; k < sortedIndices.size(); k++) {
                result[sortedIndices[k]] = chars[k];
            }
        }

        return result;
    }
};
