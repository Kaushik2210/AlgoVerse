from typing import List


class Solution:
    def criticalConnections(self, n: int, connections: List[List[int]]) -> List[List[int]]:
        graph = [[] for _ in range(n)]
        for a, b in connections:
            graph[a].append(b)
            graph[b].append(a)

        disc = [-1] * n
        low = [-1] * n
        bridges = []
        timer = 0

        # Iterative DFS (Tarjan's bridge-finding) to avoid Python's recursion
        # limit on graphs with up to 10^5 nodes. Each stack frame tracks the
        # node, the edge it arrived from (to skip the immediate parent edge,
        # not just any edge to the parent value, since multi-edges could
        # otherwise be mishandled), and an index into that node's adjacency
        # list to resume iteration from.
        for start in range(n):
            if disc[start] != -1:
                continue

            stack = [(start, -1, 0)]
            disc[start] = low[start] = timer
            timer += 1

            while stack:
                u, parent_edge, idx = stack.pop()

                if idx < len(graph[u]):
                    stack.append((u, parent_edge, idx + 1))
                    v = graph[u][idx]

                    if idx == parent_edge:
                        # this is the specific edge back to where we came from
                        continue

                    if disc[v] == -1:
                        disc[v] = low[v] = timer
                        timer += 1
                        # find v's position of the edge back to u so it can
                        # be skipped when v processes its own neighbors
                        back_idx = graph[v].index(u)
                        stack.append((v, back_idx, 0))
                    else:
                        low[u] = min(low[u], disc[v])
                else:
                    # done with u's neighbors; propagate low[u] up to parent
                    if stack:
                        parent_u = stack[-1][0]
                        low[parent_u] = min(low[parent_u], low[u])
                        if low[u] > disc[parent_u]:
                            bridges.append([parent_u, u])

        return bridges
