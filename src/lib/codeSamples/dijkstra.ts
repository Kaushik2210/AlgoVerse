import type { CodeSamples } from "./types";
import { DIJKSTRA_CODE } from "@/lib/algorithms/dijkstra";

export const DIJKSTRA_CODE_SAMPLES: CodeSamples = {
  js: DIJKSTRA_CODE,
  python: `import math

def dijkstra(adj: dict, nodes: list, start) -> dict:
    dist = {n: 0 if n == start else math.inf for n in nodes}
    prev = {}
    visited = set()

    while len(visited) < len(nodes):
        u = unvisited_node_with_min_dist(dist, visited)
        if u is None:
            break  # remaining nodes unreachable

        for to, weight in adj[u]:
            if to in visited:
                continue
            candidate = dist[u] + weight
            if candidate < dist[to]:
                dist[to] = candidate
                prev[to] = u

        visited.add(u)  # u's distance is now final
    return dist`,
  java: `public class Solution {
    public static Map<Integer, Double> dijkstra(Map<Integer, List<Edge>> adj, List<Integer> nodes, int start) {
        Map<Integer, Double> dist = new HashMap<>();
        Map<Integer, Integer> prev = new HashMap<>();
        Set<Integer> visited = new HashSet<>();
        for (int n : nodes) dist.put(n, n == start ? 0.0 : Double.POSITIVE_INFINITY);

        while (visited.size() < nodes.size()) {
            Integer u = unvisitedNodeWithMinDist(dist, visited);
            if (u == null) break; // remaining nodes unreachable

            for (Edge e : adj.get(u)) {
                if (visited.contains(e.to)) continue;
                double candidate = dist.get(u) + e.weight;
                if (candidate < dist.get(e.to)) {
                    dist.put(e.to, candidate);
                    prev.put(e.to, u);
                }
            }

            visited.add(u); // u's distance is now final
        }
        return dist;
    }
}`,
  cpp: `#include <unordered_map>
#include <unordered_set>
#include <limits>
using namespace std;

unordered_map<int, double> dijkstra(unordered_map<int, vector<Edge>>& adj, vector<int>& nodes, int start) {
    unordered_map<int, double> dist;
    unordered_map<int, int> prev;
    unordered_set<int> visited;
    for (int n : nodes) dist[n] = (n == start) ? 0.0 : numeric_limits<double>::infinity();

    while (visited.size() < nodes.size()) {
        int u = unvisitedNodeWithMinDist(dist, visited);
        if (u == -1) break; // remaining nodes unreachable

        for (const Edge& e : adj[u]) {
            if (visited.count(e.to)) continue;
            double candidate = dist[u] + e.weight;
            if (candidate < dist[e.to]) {
                dist[e.to] = candidate;
                prev[e.to] = u;
            }
        }

        visited.insert(u); // u's distance is now final
    }
    return dist;
}`,
};
