from typing import List


class Solution:
    def longestPath(self, parent: List[int], s: str) -> int:
        n = len(parent)
        children = [[] for _ in range(n)]
        for v in range(1, n):
            children[parent[v]].append(v)

        longest_down = [1] * n  # longest valid downward chain starting at v
        answer = 1

        # Iterative post-order: children must be fully processed (their
        # longest_down finalized) before their parent combines the results,
        # so recursion depth up to 10^5 is avoided with an explicit stack.
        order = []
        stack = [0]
        while stack:
            u = stack.pop()
            order.append(u)
            for c in children[u]:
                stack.append(c)

        for u in reversed(order):
            best1 = best2 = 0
            for c in children[u]:
                if s[c] != s[u]:
                    chain = longest_down[c]
                    if chain > best1:
                        best1, best2 = chain, best1
                    elif chain > best2:
                        best2 = chain

            longest_down[u] = 1 + best1
            answer = max(answer, 1 + best1 + best2)

        return answer
