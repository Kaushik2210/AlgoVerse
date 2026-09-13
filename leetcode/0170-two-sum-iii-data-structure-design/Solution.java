import java.util.HashMap;
import java.util.Map;

class TwoSum {
    private final Map<Integer, Integer> counts = new HashMap<>();

    public TwoSum() {
    }

    public void add(int number) {
        counts.merge(number, 1, Integer::sum);
    }

    public boolean find(int value) {
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            int k = entry.getKey();
            int complement = value - k;
            if (complement == k) {
                if (entry.getValue() > 1) return true;
            } else if (counts.containsKey(complement)) {
                return true;
            }
        }
        return false;
    }
}

/**
 * Your TwoSum object will be instantiated and called as such:
 * TwoSum obj = new TwoSum();
 * obj.add(number);
 * boolean param_2 = obj.find(value);
 */
