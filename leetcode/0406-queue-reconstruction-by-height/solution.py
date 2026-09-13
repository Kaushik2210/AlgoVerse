from typing import List


class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        # Tallest first (descending height); ties broken by k ascending.
        people.sort(key=lambda p: (-p[0], p[1]))
        result = []
        for person in people:
            result.insert(person[1], person)
        return result
