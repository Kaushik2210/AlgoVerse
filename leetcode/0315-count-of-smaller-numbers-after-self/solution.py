from typing import List


class Solution:
    def countSmaller(self, nums: List[int]) -> List[int]:
        n = len(nums)
        counts = [0] * n
        indices = list(range(n))  # indices into nums, sorted by nums value as we merge

        def merge_sort(lo: int, hi: int) -> None:
            if hi - lo <= 1:
                return
            mid = (lo + hi) // 2
            merge_sort(lo, mid)
            merge_sort(mid, hi)

            merged = []
            i, j = lo, mid
            right_taken = 0  # how many elements from the right half have been merged in so far
            while i < mid and j < hi:
                if nums[indices[i]] <= nums[indices[j]]:
                    # every element from the right half taken before this left element
                    # is strictly smaller than nums[indices[i]] and comes after it
                    counts[indices[i]] += right_taken
                    merged.append(indices[i])
                    i += 1
                else:
                    merged.append(indices[j])
                    j += 1
                    right_taken += 1
            while i < mid:
                counts[indices[i]] += right_taken
                merged.append(indices[i])
                i += 1
            while j < hi:
                merged.append(indices[j])
                j += 1

            indices[lo:hi] = merged

        merge_sort(0, n)
        return counts
