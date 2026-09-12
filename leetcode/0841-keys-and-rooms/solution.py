from typing import List


class Solution:
    def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:
        n = len(rooms)
        visited = [False] * n
        stack = [0]
        visited[0] = True
        count = 1

        while stack:
            room = stack.pop()
            for key in rooms[room]:
                if not visited[key]:
                    visited[key] = True
                    count += 1
                    stack.append(key)

        return count == n
