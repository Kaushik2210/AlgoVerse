#include <string>
#include <sstream>
#include <unordered_map>
#include <vector>
using namespace std;

class Solution {
public:
    bool wordPattern(string pattern, string s) {
        vector<string> words;
        stringstream ss(s);
        string word;
        while (ss >> word) {
            words.push_back(word);
        }
        if (pattern.size() != words.size()) return false;

        unordered_map<char, string> charToWord;
        unordered_map<string, char> wordToChar;
        for (size_t i = 0; i < pattern.size(); i++) {
            char ch = pattern[i];
            const string& w = words[i];
            auto it1 = charToWord.find(ch);
            if (it1 != charToWord.end() && it1->second != w) return false;
            auto it2 = wordToChar.find(w);
            if (it2 != wordToChar.end() && it2->second != ch) return false;
            charToWord[ch] = w;
            wordToChar[w] = ch;
        }
        return true;
    }
};
