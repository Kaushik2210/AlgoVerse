#include <map>
using namespace std;

class MyCalendarThree {
public:
    map<int, int> deltas;

    MyCalendarThree() {}

    int book(int start, int end) {
        deltas[start]++;
        deltas[end]--;

        int active = 0, best = 0;
        for (auto& [pos, delta] : deltas) {
            active += delta;
            best = max(best, active);
        }
        return best;
    }
};

/**
 * Your MyCalendarThree object will be instantiated and called as such:
 * MyCalendarThree* obj = new MyCalendarThree();
 * int param_1 = obj->book(start,end);
 */
