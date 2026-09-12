from typing import List


class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        result = []
        n = len(s)
        segments = []

        def valid(segment: str) -> bool:
            if len(segment) > 1 and segment[0] == '0':
                return False
            return 0 <= int(segment) <= 255

        def backtrack(start: int) -> None:
            if len(segments) == 4:
                if start == n:
                    result.append('.'.join(segments))
                return

            if n - start > (4 - len(segments)) * 3:
                return

            for length in range(1, 4):
                if start + length > n:
                    break
                segment = s[start:start + length]
                if valid(segment):
                    segments.append(segment)
                    backtrack(start + length)
                    segments.pop()

        backtrack(0)
        return result
