#include <vector>
#include <string>
#include <unordered_set>
#include <queue>
using namespace std;

class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> wordSet(wordList.begin(), wordList.end());
        if (wordSet.find(endWord) == wordSet.end()) {
            return 0;
        }

        queue<string> q;
        q.push(beginWord);
        wordSet.erase(beginWord);
        int dist = 1;

        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                string word = q.front();
                q.pop();
                if (word == endWord) {
                    return dist;
                }

                for (int pos = 0; pos < (int)word.size(); pos++) {
                    char original = word[pos];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == original) continue;
                        word[pos] = c;
                        if (wordSet.count(word)) {
                            wordSet.erase(word);
                            q.push(word);
                        }
                    }
                    word[pos] = original;
                }
            }
            dist++;
        }

        return 0;
    }
};
