#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    int superpalindromesInRange(string left, string right) {
        long long lo = stoll(left);
        long long hi = stoll(right);
        int count = 0;
        int limit = 100000;

        for (int seed = 1; seed < limit; seed++) {
            string s = to_string(seed);

            string oddRev = s.substr(0, s.size() - 1);
            reverse(oddRev.begin(), oddRev.end());
            string oddStr = s + oddRev;

            string evenRev = s;
            reverse(evenRev.begin(), evenRev.end());
            string evenStr = s + evenRev;

            long long oddRoot = stoll(oddStr);
            long long evenRoot = stoll(evenStr);

            for (long long root : {oddRoot, evenRoot}) {
                long long square = root * root;
                if (square > hi) continue;
                if (square >= lo && isPalindrome(square)) {
                    count++;
                }
            }
        }

        return count;
    }

private:
    bool isPalindrome(long long n) {
        string s = to_string(n);
        int i = 0, j = (int)s.size() - 1;
        while (i < j) {
            if (s[i] != s[j]) return false;
            i++;
            j--;
        }
        return true;
    }
};
