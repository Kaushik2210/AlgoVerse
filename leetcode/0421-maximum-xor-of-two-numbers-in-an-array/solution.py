from typing import List


class Solution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        max_bit = max(nums).bit_length() if nums else 0
        root = {}

        def insert(num: int) -> None:
            node = root
            for i in range(max_bit - 1, -1, -1):
                bit = (num >> i) & 1
                node = node.setdefault(bit, {})

        def query(num: int) -> int:
            node = root
            result = 0
            for i in range(max_bit - 1, -1, -1):
                bit = (num >> i) & 1
                want = 1 - bit
                if want in node:
                    result |= (1 << i)
                    node = node[want]
                else:
                    node = node[bit]
            return result

        best = 0
        for num in nums:
            insert(num)
        for num in nums:
            best = max(best, query(num))
        return best
