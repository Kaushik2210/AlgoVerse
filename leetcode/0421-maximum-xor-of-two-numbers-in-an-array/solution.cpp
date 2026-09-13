#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    struct TrieNode {
        TrieNode* children[2] = {nullptr, nullptr};
    };

    int maxXor(vector<int>& nums, TrieNode* root, int num, int maxBit) {
        TrieNode* node = root;
        int result = 0;
        for (int i = maxBit - 1; i >= 0; i--) {
            int bit = (num >> i) & 1;
            int want = 1 - bit;
            if (node->children[want]) {
                result |= (1 << i);
                node = node->children[want];
            } else {
                node = node->children[bit];
            }
        }
        return result;
    }

    int findMaximumXOR(vector<int>& nums) {
        int maxVal = 0;
        for (int num : nums) maxVal = max(maxVal, num);
        int maxBit = 0;
        while ((1 << maxBit) <= maxVal) maxBit++;

        TrieNode* root = new TrieNode();
        for (int num : nums) {
            TrieNode* node = root;
            for (int i = maxBit - 1; i >= 0; i--) {
                int bit = (num >> i) & 1;
                if (!node->children[bit]) {
                    node->children[bit] = new TrieNode();
                }
                node = node->children[bit];
            }
        }

        int best = 0;
        for (int num : nums) {
            best = max(best, maxXor(nums, root, num, maxBit));
        }
        return best;
    }
};
