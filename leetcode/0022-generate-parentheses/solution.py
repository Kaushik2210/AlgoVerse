from typing import List


class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        result = []
        path = []

        def backtrack(open_count: int, close_count: int) -> None:
            if open_count == n and close_count == n:
                result.append("".join(path))
                return

            if open_count < n:
                path.append("(")
                backtrack(open_count + 1, close_count)
                path.pop()

            if close_count < open_count:
                path.append(")")
                backtrack(open_count, close_count + 1)
                path.pop()

        backtrack(0, 0)
        return result
