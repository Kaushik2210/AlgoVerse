#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        unordered_map<string, string> parent;
        unordered_map<string, string> emailToName;

        for (auto& account : accounts) {
            const string& name = account[0];
            const string& firstEmail = account[1];
            for (size_t i = 1; i < account.size(); i++) {
                if (!parent.count(account[i])) parent[account[i]] = account[i];
                emailToName[account[i]] = name;
            }
            for (size_t i = 2; i < account.size(); i++) {
                unite(parent, firstEmail, account[i]);
            }
        }

        unordered_map<string, vector<string>> groups;
        for (auto& [email, _] : parent) {
            groups[find(parent, email)].push_back(email);
        }

        vector<vector<string>> result;
        for (auto& [root, emails] : groups) {
            vector<string> sorted_emails = emails;
            sort(sorted_emails.begin(), sorted_emails.end());
            vector<string> merged;
            merged.push_back(emailToName[root]);
            for (auto& e : sorted_emails) merged.push_back(e);
            result.push_back(merged);
        }

        return result;
    }

private:
    string find(unordered_map<string, string>& parent, string x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    void unite(unordered_map<string, string>& parent, const string& a, const string& b) {
        string ra = find(parent, a), rb = find(parent, b);
        if (ra != rb) parent[ra] = rb;
    }
};
