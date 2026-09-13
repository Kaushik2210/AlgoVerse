#include <set>
using namespace std;

class ExamRoom {
public:
    ExamRoom(int n) : n(n) {}

    int seat() {
        int chosen = 0;

        if (!seats.empty()) {
            int bestDist = *seats.begin();
            chosen = 0;

            auto it = seats.begin();
            int prev = *it;
            ++it;
            for (; it != seats.end(); ++it) {
                int cur = *it;
                int dist = (cur - prev) / 2;
                if (dist > bestDist) {
                    bestDist = dist;
                    chosen = prev + dist;
                }
                prev = cur;
            }

            int lastDist = n - 1 - *seats.rbegin();
            if (lastDist > bestDist) {
                chosen = n - 1;
            }
        }

        seats.insert(chosen);
        return chosen;
    }

    void leave(int p) {
        seats.erase(p);
    }

private:
    int n;
    set<int> seats;
};
