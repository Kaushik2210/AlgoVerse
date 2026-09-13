#include <unordered_map>
using namespace std;

class TwoSum {
public:
    TwoSum() {}

    void add(int number) {
        counts[number]++;
    }

    bool find(int value) {
        for (auto& [k, cnt] : counts) {
            int complement = value - k;
            if (complement == k) {
                if (cnt > 1) return true;
            } else if (counts.count(complement)) {
                return true;
            }
        }
        return false;
    }

private:
    unordered_map<int, int> counts;
};

/**
 * Your TwoSum object will be instantiated and called as such:
 * TwoSum* obj = new TwoSum();
 * obj->add(number);
 * bool param_2 = obj->find(value);
 */
