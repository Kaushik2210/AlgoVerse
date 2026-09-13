#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    vector<string> addOperators(string num, int target) {
        vector<string> results;
        backtrack(num, target, 0, "", 0LL, 0LL, results);
        return results;
    }

private:
    void backtrack(const string& num, long long target, int index, string expr,
                    long long value, long long lastOperand, vector<string>& results) {
        int n = (int)num.size();
        if (index == n) {
            if (value == target) {
                results.push_back(expr);
            }
            return;
        }

        for (int end = index + 1; end <= n; end++) {
            string piece = num.substr(index, end - index);
            if (piece.size() > 1 && piece[0] == '0') {
                break; // no leading zeros in a multi-digit operand
            }
            long long operand = stoll(piece);

            if (index == 0) {
                backtrack(num, target, end, piece, operand, operand, results);
            } else {
                backtrack(num, target, end, expr + "+" + piece, value + operand, operand, results);
                backtrack(num, target, end, expr + "-" + piece, value - operand, -operand, results);
                backtrack(num, target, end, expr + "*" + piece,
                          value - lastOperand + lastOperand * operand, lastOperand * operand, results);
            }
        }
    }
};
