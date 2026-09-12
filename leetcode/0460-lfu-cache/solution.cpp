#include <unordered_map>
#include <list>
using namespace std;

class LFUCache {
public:
    LFUCache(int capacity) : capacity(capacity), size(0), minFreq(0) {}

    int get(int key) {
        auto it = keyToVal.find(key);
        if (it == keyToVal.end()) return -1;

        bump(key);
        return it->second;
    }

    void put(int key, int value) {
        if (capacity <= 0) return;

        if (keyToVal.count(key)) {
            keyToVal[key] = value;
            bump(key);
            return;
        }

        if (size >= capacity) {
            auto& bucket = freqToKeys[minFreq];
            int evictKey = bucket.back();
            bucket.pop_back();
            if (bucket.empty()) freqToKeys.erase(minFreq);
            keyToVal.erase(evictKey);
            keyToFreq.erase(evictKey);
            keyToIter.erase(evictKey);
            size--;
        }

        keyToVal[key] = value;
        keyToFreq[key] = 1;
        freqToKeys[1].push_front(key);
        keyToIter[key] = freqToKeys[1].begin();
        minFreq = 1;
        size++;
    }

private:
    int capacity, size, minFreq;
    unordered_map<int, int> keyToVal;
    unordered_map<int, int> keyToFreq;
    unordered_map<int, list<int>> freqToKeys;
    unordered_map<int, list<int>::iterator> keyToIter;

    void bump(int key) {
        int freq = keyToFreq[key];
        auto& bucket = freqToKeys[freq];
        bucket.erase(keyToIter[key]);
        if (bucket.empty()) {
            freqToKeys.erase(freq);
            if (minFreq == freq) minFreq++;
        }

        keyToFreq[key] = freq + 1;
        freqToKeys[freq + 1].push_front(key);
        keyToIter[key] = freqToKeys[freq + 1].begin();
    }
};

/**
 * Your LFUCache object will be instantiated and called as such:
 * LFUCache* obj = new LFUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
