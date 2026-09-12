from typing import List


class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        dist = [float('inf')] * n
        dist[src] = 0

        for _ in range(k + 1):
            new_dist = dist[:]
            for u, v, price in flights:
                if dist[u] != float('inf') and dist[u] + price < new_dist[v]:
                    new_dist[v] = dist[u] + price
            dist = new_dist

        return dist[dst] if dist[dst] != float('inf') else -1
