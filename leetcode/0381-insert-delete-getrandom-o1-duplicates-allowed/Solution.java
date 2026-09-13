import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;

class RandomizedCollection {
    private final List<Integer> values = new ArrayList<>();
    private final Map<Integer, Set<Integer>> indexes = new HashMap<>();
    private final Random rand = new Random();

    public RandomizedCollection() {
    }

    public boolean insert(int val) {
        indexes.putIfAbsent(val, new HashSet<>());
        boolean isNew = indexes.get(val).isEmpty();
        indexes.get(val).add(values.size());
        values.add(val);
        return isNew;
    }

    public boolean remove(int val) {
        Set<Integer> idxSet = indexes.get(val);
        if (idxSet == null || idxSet.isEmpty()) return false;

        int removeIdx = idxSet.iterator().next();
        idxSet.remove(removeIdx); // this occurrence of val is gone

        int lastIdx = values.size() - 1;
        int lastVal = values.get(lastIdx);

        if (removeIdx != lastIdx) {
            values.set(removeIdx, lastVal);
            // the value that used to live at lastIdx now lives at removeIdx
            indexes.get(lastVal).remove(lastIdx);
            indexes.get(lastVal).add(removeIdx);
        }

        values.remove(values.size() - 1);
        return true;
    }

    public int getRandom() {
        return values.get(rand.nextInt(values.size()));
    }
}

/**
 * Your RandomizedCollection object will be instantiated and called as such:
 * RandomizedCollection obj = new RandomizedCollection();
 * boolean param_1 = obj.insert(val);
 * boolean param_2 = obj.remove(val);
 * int param_3 = obj.getRandom();
 */
