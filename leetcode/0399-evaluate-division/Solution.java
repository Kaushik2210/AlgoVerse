import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.List;

class Solution {
    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        Map<String, Map<String, Double>> graph = new HashMap<>();

        for (int i = 0; i < equations.size(); i++) {
            String a = equations.get(i).get(0);
            String b = equations.get(i).get(1);
            double value = values[i];
            graph.computeIfAbsent(a, k -> new HashMap<>()).put(b, value);
            graph.computeIfAbsent(b, k -> new HashMap<>()).put(a, 1.0 / value);
        }

        double[] results = new double[queries.size()];
        for (int i = 0; i < queries.size(); i++) {
            String c = queries.get(i).get(0);
            String d = queries.get(i).get(1);
            if (!graph.containsKey(c) || !graph.containsKey(d)) {
                results[i] = -1.0;
            } else {
                results[i] = dfs(graph, c, d, 1.0, new HashSet<>());
            }
        }
        return results;
    }

    private double dfs(Map<String, Map<String, Double>> graph, String node, String target, double product, Set<String> visited) {
        if (node.equals(target)) {
            return product;
        }
        visited.add(node);
        for (Map.Entry<String, Double> entry : graph.get(node).entrySet()) {
            String neighbor = entry.getKey();
            if (!visited.contains(neighbor)) {
                double result = dfs(graph, neighbor, target, product * entry.getValue(), visited);
                if (result != -1.0) {
                    return result;
                }
            }
        }
        return -1.0;
    }
}
