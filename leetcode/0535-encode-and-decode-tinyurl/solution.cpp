#include <cstdlib>
#include <string>
#include <unordered_map>
#include <unordered_set>
using namespace std;

class Solution {
    unordered_map<string, string> longToShort;
    unordered_map<string, string> shortToLong;
    unordered_set<string> usedCodes;
    const string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

public:
    // Encodes a URL to a shortened URL.
    string encode(string longUrl) {
        auto it = longToShort.find(longUrl);
        if (it != longToShort.end()) {
            return it->second;
        }
        string code;
        do {
            code.clear();
            for (int i = 0; i < 6; i++) {
                code += alphabet[rand() % alphabet.size()];
            }
        } while (usedCodes.count(code));
        usedCodes.insert(code);

        string shortUrl = "http://tinyurl.com/" + code;
        longToShort[longUrl] = shortUrl;
        shortToLong[shortUrl] = longUrl;
        return shortUrl;
    }

    // Decodes a shortened URL to its original URL.
    string decode(string shortUrl) {
        return shortToLong[shortUrl];
    }
};

// Your Solution object will be instantiated and called as such:
// Solution solution;
// solution.decode(solution.encode(url));
