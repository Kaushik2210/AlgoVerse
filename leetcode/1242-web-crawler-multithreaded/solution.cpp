#include <queue>
#include <string>
#include <unordered_set>
#include <vector>
using namespace std;

/**
 * // This is the HtmlParser's API interface.
 * // You should not implement it, or speculate about its implementation
 * class HtmlParser {
 * public:
 *     vector<string> getUrls(string url);
 * };
 */

class HtmlParser {
public:
    vector<string> getUrls(string url);
};

class Solution {
    string hostname(const string& url) {
        // url looks like "http://host/path/..."; split on '/' and take the 3rd token,
        // same as Python's url.split('/')[2] -- works whether or not a path follows
        vector<string> tokens;
        string cur;
        for (char ch : url) {
            if (ch == '/') {
                tokens.push_back(cur);
                cur.clear();
            } else {
                cur += ch;
            }
        }
        tokens.push_back(cur);
        return tokens[2];
    }

public:
    vector<string> crawl(string startUrl, HtmlParser htmlParser) {
        string host = hostname(startUrl);
        unordered_set<string> visited = {startUrl};
        queue<string> q;
        q.push(startUrl);

        while (!q.empty()) {
            string url = q.front();
            q.pop();
            for (const string& nextUrl : htmlParser.getUrls(url)) {
                if (!visited.count(nextUrl) && hostname(nextUrl) == host) {
                    visited.insert(nextUrl);
                    q.push(nextUrl);
                }
            }
        }

        return vector<string>(visited.begin(), visited.end());
    }
};
