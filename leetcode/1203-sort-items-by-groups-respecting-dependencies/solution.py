from typing import List
from collections import defaultdict, deque


class Solution:
    def sortItems(self, n: int, m: int, group: List[int], beforeItems: List[List[int]]) -> List[int]:
        # Ungrouped items each get their own private group of one, so the
        # exact same two-level machinery handles them without special casing.
        group = group[:]
        next_group = m
        for i in range(n):
            if group[i] == -1:
                group[i] = next_group
                next_group += 1
        total_groups = next_group

        item_graph = defaultdict(list)
        item_in_degree = [0] * n
        group_graph = defaultdict(list)
        group_in_degree = [0] * total_groups
        group_edges_seen = set()

        for i in range(n):
            for dep in beforeItems[i]:
                item_graph[dep].append(i)
                item_in_degree[i] += 1

                gi, gd = group[i], group[dep]
                if gi != gd and (gd, gi) not in group_edges_seen:
                    group_edges_seen.add((gd, gi))
                    group_graph[gd].append(gi)
                    group_in_degree[gi] += 1

        def topo_sort(nodes, graph, in_degree):
            queue = deque(v for v in nodes if in_degree[v] == 0)
            order = []
            while queue:
                v = queue.popleft()
                order.append(v)
                for nxt in graph[v]:
                    in_degree[nxt] -= 1
                    if in_degree[nxt] == 0:
                        queue.append(nxt)
            return order if len(order) == len(nodes) else None

        group_order = topo_sort(range(total_groups), group_graph, group_in_degree)
        if group_order is None:
            return []

        item_order = topo_sort(range(n), item_graph, item_in_degree)
        if item_order is None:
            return []

        # Bucket items by group, preserving each item's relative order from
        # the overall item-level topological sort.
        items_by_group = defaultdict(list)
        for item in item_order:
            items_by_group[group[item]].append(item)

        result = []
        for g in group_order:
            result.extend(items_by_group[g])

        return result
