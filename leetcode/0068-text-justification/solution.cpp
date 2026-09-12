#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        vector<string> result;
        vector<string> line;
        int lineLen = 0;

        for (const string& word : words) {
            int needed = lineLen + (int)word.size() + (line.empty() ? 0 : (int)line.size());
            if (!line.empty() && needed > maxWidth) {
                result.push_back(formatLine(line, maxWidth, false));
                line.clear();
                lineLen = 0;
            }

            line.push_back(word);
            lineLen += word.size();
        }

        if (!line.empty()) {
            result.push_back(formatLine(line, maxWidth, true));
        }

        return result;
    }

private:
    string formatLine(const vector<string>& line, int maxWidth, bool last) {
        if (last || line.size() == 1) {
            string text = line[0];
            for (size_t i = 1; i < line.size(); i++) {
                text += " " + line[i];
            }
            text += string(maxWidth - text.size(), ' ');
            return text;
        }

        int totalChars = 0;
        for (const string& w : line) totalChars += w.size();

        int gaps = (int)line.size() - 1;
        int totalSpaces = maxWidth - totalChars;
        int baseSpace = totalSpaces / gaps;
        int extra = totalSpaces % gaps;

        string result;
        for (size_t i = 0; i + 1 < line.size(); i++) {
            result += line[i];
            int spaces = baseSpace + ((int)i < extra ? 1 : 0);
            result += string(spaces, ' ');
        }
        result += line.back();

        return result;
    }
};
