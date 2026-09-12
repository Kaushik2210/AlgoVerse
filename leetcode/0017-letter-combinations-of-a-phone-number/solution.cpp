#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    vector<string> letterCombinations(string digits) {
        vector<string> result;
        if (digits.empty()) {
            return result;
        }

        vector<string> mapping = {
            "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
        };

        string path;
        backtrack(digits, 0, path, mapping, result);
        return result;
    }

private:
    void backtrack(const string& digits, int index, string& path,
                    const vector<string>& mapping, vector<string>& result) {
        if (index == (int)digits.size()) {
            result.push_back(path);
            return;
        }

        const string& letters = mapping[digits[index] - '0'];
        for (char letter : letters) {
            path.push_back(letter);
            backtrack(digits, index + 1, path, mapping, result);
            path.pop_back();
        }
    }
};
