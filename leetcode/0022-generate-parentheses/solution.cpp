#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> result;
        string path;
        backtrack(n, 0, 0, path, result);
        return result;
    }

private:
    void backtrack(int n, int openCount, int closeCount, string& path, vector<string>& result) {
        if (openCount == n && closeCount == n) {
            result.push_back(path);
            return;
        }

        if (openCount < n) {
            path.push_back('(');
            backtrack(n, openCount + 1, closeCount, path, result);
            path.pop_back();
        }

        if (closeCount < openCount) {
            path.push_back(')');
            backtrack(n, openCount, closeCount + 1, path, result);
            path.pop_back();
        }
    }
};
