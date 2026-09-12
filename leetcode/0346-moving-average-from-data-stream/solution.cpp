#include <deque>
using namespace std;

class MovingAverage {
private:
    int size;
    deque<int> window;
    long long total;

public:
    MovingAverage(int size) : size(size), total(0) {}

    double next(int val) {
        window.push_back(val);
        total += val;

        if ((int)window.size() > size) {
            total -= window.front();
            window.pop_front();
        }

        return (double)total / window.size();
    }
};

/**
 * Your MovingAverage object will be instantiated and called as such:
 * MovingAverage* obj = new MovingAverage(size);
 * double param_1 = obj->next(val);
 */
