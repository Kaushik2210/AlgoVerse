#include <map>
#include <string>
#include <vector>
#include <sstream>
using namespace std;

class Excel {
    vector<vector<int>> mat;
    // formulas[{row, col}] = list of (row, col) cells whose values get summed together
    map<pair<int, int>, vector<pair<int, int>>> formulas;

    pair<int, int> parseCell(const string& s) {
        int col = s[0] - 'A';
        int row = stoi(s.substr(1));
        return {row, col};
    }

    int getValue(int row, int col) {
        auto it = formulas.find({row, col});
        if (it != formulas.end()) {
            int total = 0;
            for (auto& [r, c] : it->second) {
                total += getValue(r, c);
            }
            return total;
        }
        return mat[row][col];
    }

public:
    Excel(int height, char width) {
        int w = width - 'A' + 1;
        mat.assign(height + 1, vector<int>(w, 0));
    }

    void set(int row, char column, int val) {
        int col = column - 'A';
        formulas.erase({row, col});
        mat[row][col] = val;
    }

    int get(int row, char column) {
        int col = column - 'A';
        return getValue(row, col);
    }

    int sum(int row, char column, vector<string> numbers) {
        int col = column - 'A';
        vector<pair<int, int>> cells;
        for (const string& token : numbers) {
            size_t colonPos = token.find(':');
            if (colonPos != string::npos) {
                auto topLeft = parseCell(token.substr(0, colonPos));
                auto bottomRight = parseCell(token.substr(colonPos + 1));
                for (int r = topLeft.first; r <= bottomRight.first; r++) {
                    for (int c = topLeft.second; c <= bottomRight.second; c++) {
                        cells.push_back({r, c});
                    }
                }
            } else {
                cells.push_back(parseCell(token));
            }
        }
        formulas[{row, col}] = cells;
        return getValue(row, col);
    }
};

/**
 * Your Excel object will be instantiated and called as such:
 * Excel* obj = new Excel(height, width);
 * obj->set(row,column,val);
 * int param_2 = obj->get(row,column);
 * int param_3 = obj->sum(row,column,numbers);
 */
