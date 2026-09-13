import java.util.*;

class Solution {
    public int[] sortItems(int n, int m, int[] group, List<List<Integer>> beforeItems) {
        int[] g = group.clone();
        int nextGroup = m;
        for (int i = 0; i < n; i++) {
            if (g[i] == -1) {
                g[i] = nextGroup++;
            }
        }
        int totalGroups = nextGroup;

        List<List<Integer>> itemGraph = new ArrayList<>();
        for (int i = 0; i < n; i++) itemGraph.add(new ArrayList<>());
        int[] itemInDegree = new int[n];

        List<List<Integer>> groupGraph = new ArrayList<>();
        for (int i = 0; i < totalGroups; i++) groupGraph.add(new ArrayList<>());
        int[] groupInDegree = new int[totalGroups];
        Set<Long> groupEdgesSeen = new HashSet<>();

        for (int i = 0; i < n; i++) {
            for (int dep : beforeItems.get(i)) {
                itemGraph.get(dep).add(i);
                itemInDegree[i]++;

                int gi = g[i], gd = g[dep];
                if (gi != gd) {
                    long key = (long) gd * 100000 + gi;
                    if (groupEdgesSeen.add(key)) {
                        groupGraph.get(gd).add(gi);
                        groupInDegree[gi]++;
                    }
                }
            }
        }

        List<Integer> groupOrder = topoSort(totalGroups, groupGraph, groupInDegree);
        if (groupOrder == null) return new int[0];

        List<Integer> itemOrder = topoSort(n, itemGraph, itemInDegree);
        if (itemOrder == null) return new int[0];

        Map<Integer, List<Integer>> itemsByGroup = new HashMap<>();
        for (int item : itemOrder) {
            itemsByGroup.computeIfAbsent(g[item], k -> new ArrayList<>()).add(item);
        }

        int[] result = new int[n];
        int idx = 0;
        for (int gid : groupOrder) {
            List<Integer> items = itemsByGroup.getOrDefault(gid, Collections.emptyList());
            for (int item : items) {
                result[idx++] = item;
            }
        }

        return result;
    }

    private List<Integer> topoSort(int size, List<List<Integer>> graph, int[] inDegree) {
        Deque<Integer> queue = new ArrayDeque<>();
        for (int v = 0; v < size; v++) {
            if (inDegree[v] == 0) queue.add(v);
        }
        List<Integer> order = new ArrayList<>();
        while (!queue.isEmpty()) {
            int v = queue.poll();
            order.add(v);
            for (int nxt : graph.get(v)) {
                if (--inDegree[nxt] == 0) queue.add(nxt);
            }
        }
        return order.size() == size ? order : null;
    }
}
