import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {
    public int numBusesToDestination(int[][] routes, int source, int target) {
        if (source == target) return 0;

        Map<Integer, List<Integer>> stopToRoutes = new HashMap<>();
        for (int r = 0; r < routes.length; r++) {
            for (int stop : routes[r]) {
                stopToRoutes.computeIfAbsent(stop, k -> new java.util.ArrayList<>()).add(r);
            }
        }

        Set<Integer> visitedRoutes = new HashSet<>();
        Set<Integer> visitedStops = new HashSet<>();
        visitedStops.add(source);
        Deque<int[]> queue = new ArrayDeque<>(); // {routeIdx, buses}

        for (int r : stopToRoutes.getOrDefault(source, List.of())) {
            visitedRoutes.add(r);
            queue.add(new int[]{r, 1});
        }

        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            int routeIdx = cur[0], buses = cur[1];
            for (int stop : routes[routeIdx]) {
                if (stop == target) return buses;
                if (visitedStops.contains(stop)) continue;
                visitedStops.add(stop);
                for (int nextRoute : stopToRoutes.getOrDefault(stop, List.of())) {
                    if (!visitedRoutes.contains(nextRoute)) {
                        visitedRoutes.add(nextRoute);
                        queue.add(new int[]{nextRoute, buses + 1});
                    }
                }
            }
        }

        return -1;
    }
}
