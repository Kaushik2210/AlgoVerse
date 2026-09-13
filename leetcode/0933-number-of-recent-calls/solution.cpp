#include <deque>
using namespace std;

class RecentCounter {
public:
    deque<int> requests;

    RecentCounter() {}

    int ping(int t) {
        requests.push_back(t);
        while (requests.front() < t - 3000) {
            requests.pop_front();
        }
        return (int)requests.size();
    }
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * RecentCounter* obj = new RecentCounter();
 * int param_1 = obj->ping(t);
 */
