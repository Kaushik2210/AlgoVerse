#include <string>
using namespace std;

class Solution {
public:
    string longestPalindrome(string s) {
        if (s.empty()) {
            return "";
        }

        int start = 0, end = 0;

        for (int i = 0; i < (int)s.size(); i++) {
            expand(s, i, i, start, end);
            expand(s, i, i + 1, start, end);
        }

        return s.substr(start, end - start + 1);
    }

private:
    void expand(const string& s, int left, int right, int& start, int& end) {
        while (left >= 0 && right < (int)s.size() && s[left] == s[right]) {
            left--;
            right++;
        }
        left++;
        right--;
        if (right - left > end - start) {
            start = left;
            end = right;
        }
    }
};
