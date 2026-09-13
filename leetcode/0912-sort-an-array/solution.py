import random
from typing import List


class Solution:
    """Merge sort: guaranteed O(n log n) worst case."""

    def sortArray(self, nums: List[int]) -> List[int]:
        if len(nums) <= 1:
            return nums

        mid = len(nums) // 2
        left = self.sortArray(nums[:mid])
        right = self.sortArray(nums[mid:])
        return self._merge(left, right)

    def _merge(self, left: List[int], right: List[int]) -> List[int]:
        merged = []
        i = j = 0
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                merged.append(left[i])
                i += 1
            else:
                merged.append(right[j])
                j += 1
        merged.extend(left[i:])
        merged.extend(right[j:])
        return merged


class QuickSortSolution:
    """Quicksort with a randomized pivot: expected O(n log n)."""

    def sortArray(self, nums: List[int]) -> List[int]:
        nums = nums[:]
        self._quicksort(nums, 0, len(nums) - 1)
        return nums

    def _quicksort(self, nums: List[int], lo: int, hi: int) -> None:
        if lo >= hi:
            return
        p = self._partition(nums, lo, hi)
        self._quicksort(nums, lo, p - 1)
        self._quicksort(nums, p + 1, hi)

    def _partition(self, nums: List[int], lo: int, hi: int) -> int:
        pivot_idx = random.randint(lo, hi)
        nums[pivot_idx], nums[hi] = nums[hi], nums[pivot_idx]
        pivot = nums[hi]

        i = lo
        for j in range(lo, hi):
            if nums[j] < pivot:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1
        nums[i], nums[hi] = nums[hi], nums[i]
        return i
