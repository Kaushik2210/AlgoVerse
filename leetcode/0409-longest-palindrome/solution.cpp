#include <string>
using namespace std;

class Solution {
public:
    int longestPalindrome(string s) {
        int counts[128] = {0};
        for (char ch : s) {
            counts[(unsigned char)ch]++;
        }

        int length = 0;
        bool hasOdd = false;
        for (int count : counts) {
            length += count - (count % 2);
            if (count % 2 == 1) {
                hasOdd = true;
            }
        }
        return hasOdd ? length + 1 : length;
    }
};
