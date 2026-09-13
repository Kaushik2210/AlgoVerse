#include <vector>
#include <string>
#include <cctype>
using namespace std;

class Solution {
public:
    vector<string> letterCasePermutation(string s) {
        chars = s;
        backtrack(0);
        return result;
    }

private:
    vector<string> result;
    string chars;

    void backtrack(int index) {
        if (index == (int)chars.size()) {
            result.push_back(chars);
            return;
        }

        if (isalpha(chars[index])) {
            char original = chars[index];

            chars[index] = tolower(original);
            backtrack(index + 1);

            chars[index] = toupper(original);
            backtrack(index + 1);

            chars[index] = original;
        } else {
            backtrack(index + 1);
        }
    }
};
