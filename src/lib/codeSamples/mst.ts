import type { CodeSamples } from "./types";
import { MST_CODE } from "@/lib/algorithms/mst";

export const MST_CODE_SAMPLES: Record<string, CodeSamples> = {
  prim: {
    js: MST_CODE.prim,
    python: `def prim(adj: dict, nodes: list, start) -> list:
    in_tree = {start}
    accepted = []

    while len(in_tree) < len(nodes):
        best = None  # cheapest edge crossing the frontier
        for u in in_tree:
            for to, weight in adj[u]:
                if to not in in_tree and (best is None or weight < best[2]):
                    best = (u, to, weight)
        if best is None:
            break  # graph disconnected

        in_tree.add(best[1])
        accepted.append(best)
    return accepted`,
    java: `public class Solution {
    public static List<Edge> prim(Map<Integer, List<Edge>> adj, List<Integer> nodes, int start) {
        Set<Integer> inTree = new HashSet<>(List.of(start));
        List<Edge> accepted = new ArrayList<>();

        while (inTree.size() < nodes.size()) {
            Edge best = null; // cheapest edge crossing the frontier
            for (int u : inTree) {
                for (Edge e : adj.get(u)) {
                    if (!inTree.contains(e.to) && (best == null || e.weight < best.weight)) {
                        best = new Edge(u, e.to, e.weight);
                    }
                }
            }
            if (best == null) break; // graph disconnected

            inTree.add(best.to);
            accepted.add(best);
        }
        return accepted;
    }
}`,
    cpp: `vector<Edge> prim(unordered_map<int, vector<Edge>>& adj, vector<int>& nodes, int start) {
    unordered_set<int> inTree = {start};
    vector<Edge> accepted;

    while (inTree.size() < nodes.size()) {
        optional<Edge> best; // cheapest edge crossing the frontier
        for (int u : inTree) {
            for (const Edge& e : adj[u]) {
                if (!inTree.count(e.to) && (!best || e.weight < best->weight)) {
                    best = Edge{u, e.to, e.weight};
                }
            }
        }
        if (!best) break; // graph disconnected

        inTree.insert(best->to);
        accepted.push_back(*best);
    }
    return accepted;
}`,
  },
  kruskal: {
    js: MST_CODE.kruskal,
    python: `def kruskal(nodes: list, edges: list) -> list:
    sorted_edges = sorted(edges, key=lambda e: e.weight)
    uf = UnionFind(nodes)
    accepted = []

    for e in sorted_edges:
        if uf.find(e.frm) != uf.find(e.to):
            uf.union(e.frm, e.to)
            accepted.append(e)  # safe: doesn't close a cycle
        # else: reject, would form a cycle
    return accepted`,
    java: `public class Solution {
    public static List<Edge> kruskal(List<Integer> nodes, List<Edge> edges) {
        List<Edge> sorted = new ArrayList<>(edges);
        sorted.sort(Comparator.comparingInt(e -> e.weight));
        UnionFind uf = new UnionFind(nodes);
        List<Edge> accepted = new ArrayList<>();

        for (Edge e : sorted) {
            if (uf.find(e.from) != uf.find(e.to)) {
                uf.union(e.from, e.to);
                accepted.add(e); // safe: doesn't close a cycle
            }
            // else: reject, would form a cycle
        }
        return accepted;
    }
}`,
    cpp: `vector<Edge> kruskal(vector<int>& nodes, vector<Edge> edges) {
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) {
        return a.weight < b.weight;
    });
    UnionFind uf(nodes);
    vector<Edge> accepted;

    for (const Edge& e : edges) {
        if (uf.find(e.from) != uf.find(e.to)) {
            uf.unite(e.from, e.to);
            accepted.push_back(e); // safe: doesn't close a cycle
        }
        // else: reject, would form a cycle
    }
    return accepted;
}`,
  },
};
