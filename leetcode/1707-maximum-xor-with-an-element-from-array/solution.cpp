#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

class Solution {
    static const int BITS = 30; // nums[i], x_i <= 10^9 < 2^30

    struct TrieNode {
        TrieNode* children[2] = {nullptr, nullptr};
    };

    void insert(TrieNode* root, int num) {
        TrieNode* node = root;
        for (int b = BITS; b >= 0; b--) {
            int bit = (num >> b) & 1;
            if (!node->children[bit]) node->children[bit] = new TrieNode();
            node = node->children[bit];
        }
    }

    int queryMaxXor(TrieNode* root, int x) {
        TrieNode* node = root;
        int result = 0;
        for (int b = BITS; b >= 0; b--) {
            int bit = (x >> b) & 1;
            int want = 1 - bit;
            if (node->children[want]) {
                result |= (1 << b);
                node = node->children[want];
            } else {
                node = node->children[bit];
            }
        }
        return result;
    }

public:
    vector<int> maximizeXor(vector<int>& nums, vector<vector<int>>& queries) {
        sort(nums.begin(), nums.end());
        int n = (int)nums.size();
        int q = (int)queries.size();

        vector<int> order(q);
        iota(order.begin(), order.end(), 0);
        sort(order.begin(), order.end(), [&](int a, int b) {
            return queries[a][1] < queries[b][1];
        });

        TrieNode* root = new TrieNode();
        vector<int> answer(q, -1);

        int idx = 0;
        for (int qi : order) {
            int x = queries[qi][0];
            int m = queries[qi][1];
            while (idx < n && nums[idx] <= m) {
                insert(root, nums[idx]);
                idx++;
            }
            if (idx == 0) {
                answer[qi] = -1;
            } else {
                answer[qi] = queryMaxXor(root, x);
            }
        }
        return answer;
    }
};
