from typing import List


class TrieNode:
    __slots__ = ("children",)

    def __init__(self):
        self.children = [None, None]


class Solution:
    BITS = 30  # nums[i], x_i <= 10^9 < 2^30

    def maximizeXor(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        nums.sort()
        n = len(nums)

        # sort queries by their limit m_i so we can add numbers to the trie incrementally
        order = sorted(range(len(queries)), key=lambda i: queries[i][1])

        root = TrieNode()

        def insert(num: int) -> None:
            node = root
            for b in range(self.BITS, -1, -1):
                bit = (num >> b) & 1
                if node.children[bit] is None:
                    node.children[bit] = TrieNode()
                node = node.children[bit]

        def query_max_xor(x: int) -> int:
            node = root
            result = 0
            for b in range(self.BITS, -1, -1):
                bit = (x >> b) & 1
                want = 1 - bit
                if node.children[want] is not None:
                    result |= (1 << b)
                    node = node.children[want]
                else:
                    node = node.children[bit]
            return result

        answer = [-1] * len(queries)
        idx = 0  # next index in sorted nums not yet inserted
        for qi in order:
            x, m = queries[qi]
            while idx < n and nums[idx] <= m:
                insert(nums[idx])
                idx += 1
            if idx == 0:
                answer[qi] = -1
            else:
                answer[qi] = query_max_xor(x)
        return answer
