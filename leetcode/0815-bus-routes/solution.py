from collections import defaultdict, deque
from typing import List


class Solution:
    def numBusesToDestination(self, routes: List[List[int]], source: int, target: int) -> int:
        if source == target:
            return 0

        stop_to_routes = defaultdict(list)
        for route_idx, route in enumerate(routes):
            for stop in route:
                stop_to_routes[stop].append(route_idx)

        visited_routes = set()
        visited_stops = {source}
        queue = deque()

        # seed with every route reachable directly from the source stop
        for route_idx in stop_to_routes[source]:
            visited_routes.add(route_idx)
            queue.append((route_idx, 1))

        while queue:
            route_idx, buses = queue.popleft()
            for stop in routes[route_idx]:
                if stop == target:
                    return buses
                if stop in visited_stops:
                    continue
                visited_stops.add(stop)
                for next_route in stop_to_routes[stop]:
                    if next_route not in visited_routes:
                        visited_routes.add(next_route)
                        queue.append((next_route, buses + 1))

        return -1
