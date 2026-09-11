import type { CodeSamples } from "./types";
import { FLOYD_WARSHALL_CODE } from "@/lib/algorithms/floydWarshall";

export const FLOYD_WARSHALL_CODE_SAMPLES: CodeSamples = {
  js: FLOYD_WARSHALL_CODE,
  python: `def floyd_warshall(nodes: list, edges: list) -> list[list[float]]:
    n = len(nodes)
    dist = init_matrix_from_edges(nodes, edges)  # 0 on diagonal, weight or inf elsewhere

    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]

    # (optional) a negative value on the diagonal after this
    # means a negative-weight cycle exists
    return dist`,
  java: `public class Solution {
    public static double[][] floydWarshall(List<Integer> nodes, List<Edge> edges) {
        int n = nodes.size();
        double[][] dist = initMatrixFromEdges(nodes, edges); // 0 on diagonal, weight or +Inf elsewhere

        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        // (optional) a negative value on the diagonal after this
        // means a negative-weight cycle exists
        return dist;
    }
}`,
  cpp: `vector<vector<double>> floydWarshall(vector<int>& nodes, vector<Edge>& edges) {
    int n = (int)nodes.size();
    vector<vector<double>> dist = initMatrixFromEdges(nodes, edges); // 0 on diagonal, weight or inf elsewhere

    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    // (optional) a negative value on the diagonal after this
    // means a negative-weight cycle exists
    return dist;
}`,
};
