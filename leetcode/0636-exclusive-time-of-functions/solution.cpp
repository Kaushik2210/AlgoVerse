#include <vector>
#include <string>
#include <stack>
#include <sstream>
using namespace std;

class Solution {
public:
    vector<int> exclusiveTime(int n, vector<string>& logs) {
        vector<int> result(n, 0);
        stack<int> st;
        int prevTime = 0;

        for (const string& log : logs) {
            size_t firstColon = log.find(':');
            size_t secondColon = log.find(':', firstColon + 1);

            int fnId = stoi(log.substr(0, firstColon));
            string action = log.substr(firstColon + 1, secondColon - firstColon - 1);
            int time = stoi(log.substr(secondColon + 1));

            if (action == "start") {
                if (!st.empty()) {
                    result[st.top()] += time - prevTime;
                }
                st.push(fnId);
                prevTime = time;
            } else {
                result[st.top()] += time - prevTime + 1;
                st.pop();
                prevTime = time + 1;
            }
        }

        return result;
    }
};
