from typing import List


class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        total = sum(nums)
        if total % k != 0:
            return False
        target = total // k

        nums.sort(reverse=True)
        if nums[0] > target:
            return False

        n = len(nums)
        buckets = [0] * k

        def backtrack(idx: int) -> bool:
            if idx == n:
                return True

            seen_sums = set()
            for i in range(k):
                if buckets[i] in seen_sums:
                    continue
                if buckets[i] + nums[idx] > target:
                    continue

                seen_sums.add(buckets[i])
                buckets[i] += nums[idx]
                if backtrack(idx + 1):
                    return True
                buckets[i] -= nums[idx]

                if buckets[i] == 0:
                    # Placing into an empty bucket failed; every other
                    # empty bucket is equivalent, so stop trying them.
                    break

            return False

        return backtrack(0)
