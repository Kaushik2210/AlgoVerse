from typing import List

BITS = 15  # nums[i] <= 2 * 10^4 < 2^15


class _TrieNode:
    __slots__ = ("children", "count")

    def __init__(self):
        self.children = [None, None]
        self.count = 0


class Solution:
    def countPairs(self, nums: List[int], low: int, high: int) -> int:
        return self._countPairsLessThan(nums, high + 1) - self._countPairsLessThan(nums, low)

    def _countPairsLessThan(self, nums: List[int], limit: int) -> int:
        # Counts pairs (i, j), i < j, with nums[i] ^ nums[j] < limit,
        # by inserting numbers into a binary trie one at a time and, for
        # each new number, walking the trie bit by bit to count how many
        # already-inserted numbers would XOR with it to something < limit.
        if limit <= 0:
            return 0

        root = _TrieNode()
        total = 0

        for num in nums:
            node = root
            for i in range(BITS - 1, -1, -1):
                if node is None:
                    break
                bit = (num >> i) & 1
                limit_bit = (limit >> i) & 1
                if limit_bit == 1:
                    # Taking the branch equal to `bit` makes this xor-bit 0,
                    # which is already < limit at this position regardless
                    # of what follows, so every number under that branch counts.
                    same = node.children[bit]
                    if same is not None:
                        total += same.count
                    # Keep walking down the branch that keeps the xor-bit
                    # equal to limit's bit (1), since equality must continue.
                    node = node.children[1 - bit]
                else:
                    # xor-bit must stay 0 to have any chance of being < limit.
                    node = node.children[bit]

            # Insert num into the trie, bumping counts along its path.
            node = root
            for i in range(BITS - 1, -1, -1):
                bit = (num >> i) & 1
                if node.children[bit] is None:
                    node.children[bit] = _TrieNode()
                node = node.children[bit]
                node.count += 1

        return total
