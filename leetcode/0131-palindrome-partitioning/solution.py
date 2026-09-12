from typing import List


class Solution:
    def partition(self, s: str) -> List[List[str]]:
        result = []
        path = []
        n = len(s)

        def is_palindrome(left: int, right: int) -> bool:
            while left < right:
                if s[left] != s[right]:
                    return False
                left += 1
                right -= 1
            return True

        def backtrack(start: int) -> None:
            if start == n:
                result.append(path[:])
                return
            for end in range(start + 1, n + 1):
                if is_palindrome(start, end - 1):
                    path.append(s[start:end])
                    backtrack(end)
                    path.pop()

        backtrack(0)
        return result
