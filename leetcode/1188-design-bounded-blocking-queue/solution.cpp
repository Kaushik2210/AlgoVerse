#include <condition_variable>
#include <deque>
#include <mutex>
using namespace std;

class BoundedBlockingQueue {
    int capacity;
    deque<int> queue;
    mutex mtx;
    condition_variable notFull;
    condition_variable notEmpty;

public:
    BoundedBlockingQueue(int capacity) : capacity(capacity) {}

    void enqueue(int element) {
        unique_lock<mutex> lock(mtx);
        notFull.wait(lock, [this] { return (int)queue.size() < capacity; });
        queue.push_back(element);
        notEmpty.notify_one();
    }

    int dequeue() {
        unique_lock<mutex> lock(mtx);
        notEmpty.wait(lock, [this] { return !queue.empty(); });
        int val = queue.front();
        queue.pop_front();
        notFull.notify_one();
        return val;
    }

    int size() {
        unique_lock<mutex> lock(mtx);
        return (int)queue.size();
    }
};
