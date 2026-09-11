import type { CodeSamples } from "./types";
import { TOPO_CODE } from "@/lib/algorithms/topologicalSort";

export const TOPO_CODE_SAMPLES: CodeSamples = {
  js: TOPO_CODE,
  python: `from collections import deque

def topological_sort(adj: dict, nodes: list) -> list:
    in_degree = compute_in_degrees(adj, nodes)
    queue = deque(n for n in nodes if in_degree[n] == 0)
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)

        for nb in adj[node]:
            in_degree[nb] -= 1
            if in_degree[nb] == 0:
                queue.append(nb)

    if len(order) != len(nodes):
        raise ValueError("graph has a cycle — no valid ordering")
    return order`,
  java: `import java.util.*;

public class Solution {
    public static List<Integer> topologicalSort(Map<Integer, List<Integer>> adj, List<Integer> nodes) {
        Map<Integer, Integer> inDegree = computeInDegrees(adj, nodes);
        Queue<Integer> queue = new LinkedList<>();
        for (int n : nodes) if (inDegree.get(n) == 0) queue.add(n);
        List<Integer> order = new ArrayList<>();

        while (!queue.isEmpty()) {
            int node = queue.poll();
            order.add(node);

            for (int nb : adj.get(node)) {
                inDegree.put(nb, inDegree.get(nb) - 1);
                if (inDegree.get(nb) == 0) queue.add(nb);
            }
        }

        if (order.size() != nodes.size()) {
            throw new IllegalStateException("graph has a cycle — no valid ordering");
        }
        return order;
    }
}`,
  cpp: `#include <unordered_map>
#include <vector>
#include <queue>
#include <stdexcept>
using namespace std;

vector<int> topologicalSort(unordered_map<int, vector<int>>& adj, vector<int>& nodes) {
    unordered_map<int, int> inDegree = computeInDegrees(adj, nodes);
    queue<int> q;
    for (int n : nodes) if (inDegree[n] == 0) q.push(n);
    vector<int> order;

    while (!q.empty()) {
        int node = q.front(); q.pop();
        order.push_back(node);

        for (int nb : adj[node]) {
            if (--inDegree[nb] == 0) q.push(nb);
        }
    }

    if (order.size() != nodes.size()) {
        throw runtime_error("graph has a cycle — no valid ordering");
    }
    return order;
}`,
};
