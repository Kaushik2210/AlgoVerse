#include <string>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> diffWaysToCompute(string expression) {
        return solve(expression);
    }

private:
    unordered_map<string, vector<int>> memo;

    vector<int> solve(const string& expr) {
        auto it = memo.find(expr);
        if (it != memo.end()) {
            return it->second;
        }

        if (isNumber(expr)) {
            vector<int> single = {stoi(expr)};
            memo[expr] = single;
            return single;
        }

        vector<int> results;
        for (size_t i = 0; i < expr.size(); i++) {
            char ch = expr[i];
            if (ch == '+' || ch == '-' || ch == '*') {
                vector<int> left = solve(expr.substr(0, i));
                vector<int> right = solve(expr.substr(i + 1));
                for (int l : left) {
                    for (int r : right) {
                        if (ch == '+') results.push_back(l + r);
                        else if (ch == '-') results.push_back(l - r);
                        else results.push_back(l * r);
                    }
                }
            }
        }

        memo[expr] = results;
        return results;
    }

    bool isNumber(const string& s) {
        for (char c : s) {
            if (!isdigit(c)) return false;
        }
        return true;
    }
};
