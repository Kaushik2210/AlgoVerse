#include <vector>
using namespace std;

class Solution {
    static const int BITS = 15; // nums[i] <= 2 * 10^4 < 2^15

    struct TrieNode {
        TrieNode* children[2] = {nullptr, nullptr};
        int count = 0;
    };

    int countPairsLessThan(vector<int>& nums, int limit) {
        if (limit <= 0) return 0;

        TrieNode* root = new TrieNode();
        int total = 0;

        for (int num : nums) {
            TrieNode* node = root;
            for (int i = BITS - 1; i >= 0 && node != nullptr; i--) {
                int bit = (num >> i) & 1;
                int limitBit = (limit >> i) & 1;
                if (limitBit == 1) {
                    TrieNode* same = node->children[bit];
                    if (same != nullptr) {
                        total += same->count;
                    }
                    node = node->children[1 - bit];
                } else {
                    node = node->children[bit];
                }
            }

            node = root;
            for (int i = BITS - 1; i >= 0; i--) {
                int bit = (num >> i) & 1;
                if (node->children[bit] == nullptr) {
                    node->children[bit] = new TrieNode();
                }
                node = node->children[bit];
                node->count++;
            }
        }

        return total;
    }

public:
    int countPairs(vector<int>& nums, int low, int high) {
        return countPairsLessThan(nums, high + 1) - countPairsLessThan(nums, low);
    }
};
