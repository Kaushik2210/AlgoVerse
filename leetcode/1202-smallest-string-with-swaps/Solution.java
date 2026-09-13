import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    private int[] parent;

    public String smallestStringWithSwaps(String s, List<List<Integer>> pairs) {
        int n = s.length();
        parent = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }

        for (List<Integer> pair : pairs) {
            union(pair.get(0), pair.get(1));
        }

        Map<Integer, List<Integer>> groups = new HashMap<>();
        for (int i = 0; i < n; i++) {
            groups.computeIfAbsent(find(i), k -> new ArrayList<>()).add(i);
        }

        char[] result = s.toCharArray();
        for (List<Integer> indices : groups.values()) {
            List<Integer> sortedIndices = new ArrayList<>(indices);
            Collections.sort(sortedIndices);

            List<Character> chars = new ArrayList<>();
            for (int i : sortedIndices) {
                chars.add(result[i]);
            }
            Collections.sort(chars);

            for (int k = 0; k < sortedIndices.size(); k++) {
                result[sortedIndices.get(k)] = chars.get(k);
            }
        }

        return new String(result);
    }

    private int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int a, int b) {
        int ra = find(a);
        int rb = find(b);
        if (ra != rb) {
            parent[ra] = rb;
        }
    }
}
