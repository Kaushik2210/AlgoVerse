import type { CodeSamples } from "./types";
import { GRAPH_CODE } from "@/lib/algorithms/graph";

export const GRAPH_CODE_SAMPLES: Record<string, CodeSamples> = {
  bfs: {
    js: GRAPH_CODE.bfs,
    python: `from collections import deque

def bfs(adj: dict, start) -> list:
    visited = {start}
    order = []
    queue = deque([start])

    while queue:
        node = queue.popleft()
        order.append(node)

        for nb in adj[node]:
            if nb not in visited:
                visited.add(nb)
                queue.append(nb)
    return order`,
    java: `import java.util.*;

public class Solution {
    public static List<Integer> bfs(Map<Integer, List<Integer>> adj, int start) {
        Set<Integer> visited = new HashSet<>(List.of(start));
        List<Integer> order = new ArrayList<>();
        Queue<Integer> queue = new LinkedList<>(List.of(start));

        while (!queue.isEmpty()) {
            int node = queue.poll();
            order.add(node);

            for (int nb : adj.get(node)) {
                if (visited.add(nb)) {
                    queue.add(nb);
                }
            }
        }
        return order;
    }
}`,
    cpp: `#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
using namespace std;

vector<int> bfs(unordered_map<int, vector<int>>& adj, int start) {
    unordered_set<int> visited = {start};
    vector<int> order;
    queue<int> q;
    q.push(start);

    while (!q.empty()) {
        int node = q.front(); q.pop();
        order.push_back(node);

        for (int nb : adj[node]) {
            if (visited.insert(nb).second) {
                q.push(nb);
            }
        }
    }
    return order;
}`,
  },
  dfs: {
    js: GRAPH_CODE.dfs,
    python: `def dfs(adj: dict, start) -> list:
    visited = set()
    order = []
    stack = [start]

    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.add(node)
        order.append(node)

        for nb in adj[node]:
            if nb not in visited:
                stack.append(nb)
    return order`,
    java: `import java.util.*;

public class Solution {
    public static List<Integer> dfs(Map<Integer, List<Integer>> adj, int start) {
        Set<Integer> visited = new HashSet<>();
        List<Integer> order = new ArrayList<>();
        Deque<Integer> stack = new ArrayDeque<>(List.of(start));

        while (!stack.isEmpty()) {
            int node = stack.pop();
            if (!visited.add(node)) continue;
            order.add(node);

            for (int nb : adj.get(node)) {
                if (!visited.contains(nb)) stack.push(nb);
            }
        }
        return order;
    }
}`,
    cpp: `#include <vector>
#include <unordered_map>
#include <unordered_set>
using namespace std;

vector<int> dfs(unordered_map<int, vector<int>>& adj, int start) {
    unordered_set<int> visited;
    vector<int> order;
    vector<int> stack = {start};

    while (!stack.empty()) {
        int node = stack.back(); stack.pop_back();
        if (visited.count(node)) continue;
        visited.insert(node);
        order.push_back(node);

        for (int nb : adj[node]) {
            if (!visited.count(nb)) stack.push_back(nb);
        }
    }
    return order;
}`,
  },
};
