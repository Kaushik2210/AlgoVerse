#include <vector>
#include <unordered_map>
#include <cstdlib>
using namespace std;

class RandomizedSet {
public:
    RandomizedSet() {}

    bool insert(int val) {
        if (indexOf.count(val)) return false;
        indexOf[val] = (int)values.size();
        values.push_back(val);
        return true;
    }

    bool remove(int val) {
        if (!indexOf.count(val)) return false;
        int idx = indexOf[val];
        int lastVal = values.back();

        values[idx] = lastVal;
        indexOf[lastVal] = idx;

        values.pop_back();
        indexOf.erase(val);
        return true;
    }

    int getRandom() {
        return values[rand() % values.size()];
    }

private:
    vector<int> values;
    unordered_map<int, int> indexOf;
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * RandomizedSet* obj = new RandomizedSet();
 * bool param_1 = obj->insert(val);
 * bool param_2 = obj->remove(val);
 * int param_3 = obj->getRandom();
 */
