from collections import Counter
from typing import List


class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1

        counts = Counter(nums1)
        result = []

        for x in nums2:
            if counts[x] > 0:
                result.append(x)
                counts[x] -= 1

        return result
