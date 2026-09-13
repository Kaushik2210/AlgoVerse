#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    int wordsTyping(vector<string>& sentence, int rows, int cols) {
        string s;
        for (auto& w : sentence) {
            s += w;
            s += ' ';
        }
        int totalLen = s.size();
        long long start = 0;

        for (int i = 0; i < rows; i++) {
            start += cols;
            if (s[start % totalLen] == ' ') {
                start++;
            } else {
                while (start > 0 && s[(start - 1) % totalLen] != ' ') {
                    start--;
                }
            }
        }

        return start / totalLen;
    }
};
