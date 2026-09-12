#include <string>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
using namespace std;

class Solution {
public:
    string alienOrder(vector<string>& words) {
        unordered_map<char, unordered_set<char>> graph;
        unordered_map<char, int> inDegree;

        for (const string& word : words) {
            for (char c : word) {
                graph[c];
                inDegree[c] = inDegree.count(c) ? inDegree[c] : 0;
            }
        }

        for (size_t i = 0; i + 1 < words.size(); i++) {
            const string& w1 = words[i];
            const string& w2 = words[i + 1];
            size_t minLen = min(w1.size(), w2.size());
            bool foundDiff = false;

            for (size_t j = 0; j < minLen; j++) {
                if (w1[j] != w2[j]) {
                    if (!graph[w1[j]].count(w2[j])) {
                        graph[w1[j]].insert(w2[j]);
                        inDegree[w2[j]]++;
                    }
                    foundDiff = true;
                    break;
                }
            }

            if (!foundDiff && w1.size() > w2.size()) {
                return "";
            }
        }

        queue<char> q;
        for (auto& [c, deg] : inDegree) {
            if (deg == 0) {
                q.push(c);
            }
        }

        string order;
        while (!q.empty()) {
            char c = q.front();
            q.pop();
            order += c;
            for (char next : graph[c]) {
                if (--inDegree[next] == 0) {
                    q.push(next);
                }
            }
        }

        return order.size() == inDegree.size() ? order : "";
    }
};
