#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    int calculate(string s) {
        i = 0;
        this->s = s;
        return evaluate();
    }

private:
    string s;
    size_t i = 0;

    int evaluate() {
        vector<int> stack;
        int num = 0;
        char op = '+';

        while (i < s.size()) {
            char ch = s[i];
            if (ch == ' ') {
                i++;
                continue;
            }
            if (isdigit((unsigned char)ch)) {
                num = num * 10 + (ch - '0');
                i++;
                continue;
            }
            if (ch == '(') {
                i++;
                num = evaluate();
                apply(stack, op, num);
                op = 0;
                num = 0;
                if (i < s.size() && s[i] == ')') {
                    i++;
                }
                if (i < s.size() && (s[i] == '+' || s[i] == '-' || s[i] == '*' || s[i] == '/')) {
                    op = s[i];
                    i++;
                }
                continue;
            }
            if (ch == ')') {
                apply(stack, op, num);
                i++;
                return sumStack(stack);
            }
            if (ch == '+' || ch == '-' || ch == '*' || ch == '/') {
                apply(stack, op, num);
                op = ch;
                num = 0;
                i++;
                continue;
            }
        }

        apply(stack, op, num);
        return sumStack(stack);
    }

    void apply(vector<int>& stack, char op, int num) {
        if (op == 0) return;
        if (op == '+') {
            stack.push_back(num);
        } else if (op == '-') {
            stack.push_back(-num);
        } else if (op == '*') {
            int prev = stack.back();
            stack.pop_back();
            stack.push_back(prev * num);
        } else if (op == '/') {
            int prev = stack.back();
            stack.pop_back();
            stack.push_back(prev / num);
        }
    }

    int sumStack(const vector<int>& stack) {
        int total = 0;
        for (int v : stack) total += v;
        return total;
    }
};
