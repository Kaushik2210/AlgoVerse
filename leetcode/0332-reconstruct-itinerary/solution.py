import heapq
from collections import defaultdict
from typing import List


class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        graph = defaultdict(list)
        for src, dst in tickets:
            heapq.heappush(graph[src], dst)

        result = []

        def dfs(airport: str) -> None:
            while graph[airport]:
                next_airport = heapq.heappop(graph[airport])
                dfs(next_airport)
            result.append(airport)

        dfs("JFK")
        return result[::-1]
