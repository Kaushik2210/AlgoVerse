import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

class LFUCache {
    private final int capacity;
    private int size;
    private int minFreq;
    private final Map<Integer, Integer> keyToVal;
    private final Map<Integer, Integer> keyToFreq;
    private final Map<Integer, LinkedHashMap<Integer, Boolean>> freqToKeys;

    public LFUCache(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.minFreq = 0;
        this.keyToVal = new HashMap<>();
        this.keyToFreq = new HashMap<>();
        this.freqToKeys = new HashMap<>();
    }

    private void bump(int key) {
        int freq = keyToFreq.get(key);
        LinkedHashMap<Integer, Boolean> bucket = freqToKeys.get(freq);
        bucket.remove(key);
        if (bucket.isEmpty()) {
            freqToKeys.remove(freq);
            if (minFreq == freq) {
                minFreq++;
            }
        }

        keyToFreq.put(key, freq + 1);
        freqToKeys.computeIfAbsent(freq + 1, k -> new LinkedHashMap<>()).put(key, true);
    }

    public int get(int key) {
        if (!keyToVal.containsKey(key)) {
            return -1;
        }

        bump(key);
        return keyToVal.get(key);
    }

    public void put(int key, int value) {
        if (capacity <= 0) {
            return;
        }

        if (keyToVal.containsKey(key)) {
            keyToVal.put(key, value);
            bump(key);
            return;
        }

        if (size >= capacity) {
            LinkedHashMap<Integer, Boolean> bucket = freqToKeys.get(minFreq);
            int evictKey = bucket.keySet().iterator().next();
            bucket.remove(evictKey);
            if (bucket.isEmpty()) {
                freqToKeys.remove(minFreq);
            }
            keyToVal.remove(evictKey);
            keyToFreq.remove(evictKey);
            size--;
        }

        keyToVal.put(key, value);
        keyToFreq.put(key, 1);
        freqToKeys.computeIfAbsent(1, k -> new LinkedHashMap<>()).put(key, true);
        minFreq = 1;
        size++;
    }
}

/**
 * Your LFUCache object will be instantiated and called as such:
 * LFUCache obj = new LFUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
 */
