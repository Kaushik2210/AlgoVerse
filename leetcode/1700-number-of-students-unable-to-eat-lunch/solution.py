from typing import List
from collections import Counter


class Solution:
    def countStudents(self, students: List[int], sandwiches: List[int]) -> int:
        count = Counter(students)  # count[0] = circular sandwich preferers, count[1] = square

        for sandwich in sandwiches:
            if count[sandwich] == 0:
                # No student left in the queue wants the sandwich on top,
                # and every remaining student would just keep cycling
                # forever without eating -- so we can stop right here.
                break
            count[sandwich] -= 1

        return count[0] + count[1]
