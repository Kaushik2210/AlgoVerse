#include <string>
#include <vector>
#include <sstream>
using namespace std;

class Solution {
public:
    string simplifyPath(string path) {
        vector<string> stack;
        stringstream ss(path);
        string part;

        while (getline(ss, part, '/')) {
            if (part.empty() || part == ".") {
                continue;
            }
            if (part == "..") {
                if (!stack.empty()) {
                    stack.pop_back();
                }
            } else {
                stack.push_back(part);
            }
        }

        if (stack.empty()) {
            return "/";
        }

        string result;
        for (const string& dir : stack) {
            result += "/" + dir;
        }

        return result;
    }
};
