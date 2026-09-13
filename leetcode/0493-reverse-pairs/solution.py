from typing import List


class Solution:
    def reversePairs(self, nums: List[int]) -> int:
        self.count = 0

        def merge_sort(arr: List[int]) -> List[int]:
            if len(arr) <= 1:
                return arr
            mid = len(arr) // 2
            left = merge_sort(arr[:mid])
            right = merge_sort(arr[mid:])

            # count qualifying pairs across the two halves BEFORE merging them,
            # while both halves are still individually sorted
            j = 0
            for i in range(len(left)):
                while j < len(right) and left[i] > 2 * right[j]:
                    j += 1
                self.count += j

            # now do the normal merge step
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

        merge_sort(nums)
        return self.count
