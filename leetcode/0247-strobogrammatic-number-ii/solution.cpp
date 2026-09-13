#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    vector<string> findStrobogrammatic(int n) {
        return build(n, n);
    }

private:
    vector<pair<char, char>> pairs = {
        {'0', '0'}, {'1', '1'}, {'6', '9'}, {'8', '8'}, {'9', '6'}
    };

    vector<string> build(int length, int total) {
        if (length == 0) {
            return {""};
        }
        if (length == 1) {
            return {"0", "1", "8"};
        }

        vector<string> inner = build(length - 2, total);
        vector<string> results;
        for (auto& p : pairs) {
            if (p.first == '0' && length == total) {
                continue; // no leading zero on the full-length number
            }
            for (const string& mid : inner) {
                results.push_back(p.first + mid + p.second);
            }
        }
        return results;
    }
};
