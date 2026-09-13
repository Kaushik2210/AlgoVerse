#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <cstdlib>
using namespace std;

class RandomizedCollection {
public:
    RandomizedCollection() {}

    bool insert(int val) {
        bool isNew = indexes[val].empty();
        indexes[val].insert((int)values.size());
        values.push_back(val);
        return isNew;
    }

    bool remove(int val) {
        auto it = indexes.find(val);
        if (it == indexes.end() || it->second.empty()) return false;

        int removeIdx = *it->second.begin();
        it->second.erase(removeIdx); // this occurrence of val is gone

        int lastIdx = (int)values.size() - 1;
        int lastVal = values[lastIdx];

        if (removeIdx != lastIdx) {
            values[removeIdx] = lastVal;
            // the value that used to live at lastIdx now lives at removeIdx
            indexes[lastVal].erase(lastIdx);
            indexes[lastVal].insert(removeIdx);
        }

        values.pop_back();
        return true;
    }

    int getRandom() {
        return values[rand() % values.size()];
    }

private:
    vector<int> values;
    unordered_map<int, unordered_set<int>> indexes;
};

/**
 * Your RandomizedCollection object will be instantiated and called as such:
 * RandomizedCollection* obj = new RandomizedCollection();
 * bool param_1 = obj->insert(val);
 * bool param_2 = obj->remove(val);
 * int param_3 = obj->getRandom();
 */
