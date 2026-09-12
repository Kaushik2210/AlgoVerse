from typing import List


class Solution:
    def nthSuperUglyNumber(self, n: int, primes: List[int]) -> int:
        k = len(primes)
        ugly = [1]
        pointers = [0] * k

        while len(ugly) < n:
            candidates = [ugly[pointers[i]] * primes[i] for i in range(k)]
            next_ugly = min(candidates)
            ugly.append(next_ugly)

            for i in range(k):
                if candidates[i] == next_ugly:
                    pointers[i] += 1

        return ugly[-1]
