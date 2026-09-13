class Solution:
    def maxUniqueSplit(self, s: str) -> int:
        seen = set()
        n = len(s)
        best = 0

        def backtrack(start):
            nonlocal best
            if start == n:
                best = max(best, len(seen))
                return
            # prune: even taking every remaining char as its own piece
            # couldn't beat the best found so far
            if len(seen) + (n - start) <= best:
                return
            for end in range(start + 1, n + 1):
                piece = s[start:end]
                if piece not in seen:
                    seen.add(piece)
                    backtrack(end)
                    seen.remove(piece)

        backtrack(0)
        return best
