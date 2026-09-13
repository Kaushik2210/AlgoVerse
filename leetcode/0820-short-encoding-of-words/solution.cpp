#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

class Solution {
public:
    int minimumLengthEncoding(vector<string>& words) {
        unordered_set<string> wordSet(words.begin(), words.end());

        for (const string& word : words) {
            for (size_t k = 1; k < word.size(); k++) {
                wordSet.erase(word.substr(k));
            }
        }

        int total = 0;
        for (const string& word : wordSet) {
            total += (int)word.size() + 1;
        }
        return total;
    }
};
