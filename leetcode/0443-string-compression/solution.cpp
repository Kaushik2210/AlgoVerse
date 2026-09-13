#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    int compress(vector<char>& chars) {
        int write = 0;
        int read = 0;
        int n = (int)chars.size();

        while (read < n) {
            char c = chars[read];
            int start = read;
            while (read < n && chars[read] == c) {
                read++;
            }
            int count = read - start;

            chars[write++] = c;

            if (count > 1) {
                for (char digit : to_string(count)) {
                    chars[write++] = digit;
                }
            }
        }

        return write;
    }
};
