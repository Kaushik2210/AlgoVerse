#include <string>
#include <vector>
#include <sstream>
#include <algorithm>
#include <cctype>
using namespace std;

class Solution {
public:
    string arrangeWords(string text) {
        text[0] = tolower(text[0]);

        vector<string> words;
        stringstream ss(text);
        string word;
        while (ss >> word) words.push_back(word);

        // stable_sort preserves original relative order among equal lengths
        stable_sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.size() < b.size();
        });

        words[0][0] = toupper(words[0][0]);

        string result;
        for (int i = 0; i < (int)words.size(); i++) {
            if (i > 0) result += ' ';
            result += words[i];
        }
        return result;
    }
};
