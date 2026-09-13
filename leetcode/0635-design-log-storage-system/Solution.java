import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class LogSystem {
    private static final Map<String, Integer> GRANULARITY = new HashMap<>();
    static {
        GRANULARITY.put("Year", 0);
        GRANULARITY.put("Month", 1);
        GRANULARITY.put("Day", 2);
        GRANULARITY.put("Hour", 3);
        GRANULARITY.put("Minute", 4);
        GRANULARITY.put("Second", 5);
    }

    private final List<Integer> ids = new ArrayList<>();
    private final List<int[]> parts = new ArrayList<>();

    public LogSystem() {
    }

    private int[] parse(String timestamp) {
        String[] tokens = timestamp.split(":");
        int[] result = new int[6];
        for (int i = 0; i < 6; i++) result[i] = Integer.parseInt(tokens[i]);
        return result;
    }

    // lexicographic comparison of the first (idx + 1) fields, like comparing tuples
    private int compare(int[] a, int[] b, int idx) {
        for (int i = 0; i <= idx; i++) {
            if (a[i] != b[i]) return Integer.compare(a[i], b[i]);
        }
        return 0;
    }

    public void put(int id, String timestamp) {
        ids.add(id);
        parts.add(parse(timestamp));
    }

    public List<Integer> retrieve(String start, String end, String granularity) {
        int idx = GRANULARITY.get(granularity);
        int[] startParts = parse(start);
        int[] endParts = parse(end);
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < parts.size(); i++) {
            int[] p = parts.get(i);
            if (compare(p, startParts, idx) >= 0 && compare(p, endParts, idx) <= 0) {
                result.add(ids.get(i));
            }
        }
        return result;
    }
}

/**
 * Your LogSystem object will be instantiated and called as such:
 * LogSystem obj = new LogSystem();
 * obj.put(id,timestamp);
 * List<Integer> param_2 = obj.retrieve(start,end,granularity);
 */
