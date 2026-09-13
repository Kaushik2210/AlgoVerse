import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

class RandomizedSet {
    private final List<Integer> values = new ArrayList<>();
    private final Map<Integer, Integer> indexOf = new HashMap<>();
    private final Random rand = new Random();

    public RandomizedSet() {
    }

    public boolean insert(int val) {
        if (indexOf.containsKey(val)) return false;
        indexOf.put(val, values.size());
        values.add(val);
        return true;
    }

    public boolean remove(int val) {
        if (!indexOf.containsKey(val)) return false;
        int idx = indexOf.get(val);
        int lastVal = values.get(values.size() - 1);

        values.set(idx, lastVal);
        indexOf.put(lastVal, idx);

        values.remove(values.size() - 1);
        indexOf.remove(val);
        return true;
    }

    public int getRandom() {
        return values.get(rand.nextInt(values.size()));
    }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * RandomizedSet obj = new RandomizedSet();
 * boolean param_1 = obj.insert(val);
 * boolean param_2 = obj.remove(val);
 * int param_3 = obj.getRandom();
 */
