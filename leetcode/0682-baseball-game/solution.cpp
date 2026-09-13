#include <vector>
#include <string>
#include <numeric>
using namespace std;

class Solution {
public:
    int calPoints(vector<string>& operations) {
        vector<int> stack;
        for (const string& op : operations) {
            if (op == "+") {
                stack.push_back(stack[stack.size() - 1] + stack[stack.size() - 2]);
            } else if (op == "D") {
                stack.push_back(stack.back() * 2);
            } else if (op == "C") {
                stack.pop_back();
            } else {
                stack.push_back(stoi(op));
            }
        }
        return accumulate(stack.begin(), stack.end(), 0);
    }
};
