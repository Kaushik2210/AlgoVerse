#include <string>
#include <vector>
#include <sstream>
using namespace std;

class Solution {
public:
    string toGoatLatin(string sentence) {
        string vowels = "aeiouAEIOU";
        vector<string> words;
        stringstream ss(sentence);
        string word;
        while (ss >> word) words.push_back(word);

        string result;
        for (int i = 0; i < (int)words.size(); i++) {
            string w = words[i];
            string newWord;
            if (vowels.find(w[0]) != string::npos) {
                newWord = w + "ma";
            } else {
                newWord = w.substr(1) + w[0] + "ma";
            }
            newWord += string(i + 1, 'a');

            if (i > 0) result += ' ';
            result += newWord;
        }

        return result;
    }
};
