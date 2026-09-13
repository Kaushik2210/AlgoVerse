#include <string>
#include <vector>
using namespace std;

class Codec {
public:
    string encode(vector<string>& strs) {
        string result;
        for (const string& s : strs) {
            result += to_string(s.size());
            result += '#';
            result += s;
        }
        return result;
    }

    vector<string> decode(string s) {
        vector<string> result;
        size_t i = 0;
        while (i < s.size()) {
            size_t j = i;
            while (s[j] != '#') {
                j++;
            }
            int length = stoi(s.substr(i, j - i));
            size_t start = j + 1;
            result.push_back(s.substr(start, length));
            i = start + length;
        }
        return result;
    }
};
