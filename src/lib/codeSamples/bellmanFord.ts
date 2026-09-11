import type { CodeSamples } from "./types";
import { BELLMAN_FORD_CODE } from "@/lib/algorithms/bellmanFord";

export const BELLMAN_FORD_CODE_SAMPLES: CodeSamples = {
  js: BELLMAN_FORD_CODE,
  python: `import math

def bellman_ford(nodes: list, edges: list, start) -> dict:
    dist = {n: 0 if n == start else math.inf for n in nodes}

    for _ in range(len(nodes) - 1):
        changed = False
        for u, v, weight in edges:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                changed = True
        if not changed:
            break  # stabilized early

    # one more pass: if anything still relaxes, there's a
    # negative-weight cycle reachable from start
    for u, v, weight in edges:
        if dist[u] + weight < dist[v]:
            raise ValueError("negative-weight cycle detected")

    return dist`,
  java: `public class Solution {
    public static Map<Integer, Double> bellmanFord(List<Integer> nodes, List<Edge> edges, int start) {
        Map<Integer, Double> dist = new HashMap<>();
        for (int n : nodes) dist.put(n, n == start ? 0.0 : Double.POSITIVE_INFINITY);

        for (int i = 0; i < nodes.size() - 1; i++) {
            boolean changed = false;
            for (Edge e : edges) {
                if (dist.get(e.from) + e.weight < dist.get(e.to)) {
                    dist.put(e.to, dist.get(e.from) + e.weight);
                    changed = true;
                }
            }
            if (!changed) break; // stabilized early
        }

        // one more pass: if anything still relaxes, there's a
        // negative-weight cycle reachable from start
        for (Edge e : edges) {
            if (dist.get(e.from) + e.weight < dist.get(e.to)) {
                throw new IllegalStateException("negative-weight cycle detected");
            }
        }

        return dist;
    }
}`,
  cpp: `#include <unordered_map>
#include <vector>
#include <limits>
#include <stdexcept>
using namespace std;

unordered_map<int, double> bellmanFord(vector<int>& nodes, vector<Edge>& edges, int start) {
    unordered_map<int, double> dist;
    for (int n : nodes) dist[n] = (n == start) ? 0.0 : numeric_limits<double>::infinity();

    for (size_t i = 0; i + 1 < nodes.size(); i++) {
        bool changed = false;
        for (const Edge& e : edges) {
            if (dist[e.from] + e.weight < dist[e.to]) {
                dist[e.to] = dist[e.from] + e.weight;
                changed = true;
            }
        }
        if (!changed) break; // stabilized early
    }

    // one more pass: if anything still relaxes, there's a
    // negative-weight cycle reachable from start
    for (const Edge& e : edges) {
        if (dist[e.from] + e.weight < dist[e.to]) {
            throw runtime_error("negative-weight cycle detected");
        }
    }

    return dist;
}`,
};
