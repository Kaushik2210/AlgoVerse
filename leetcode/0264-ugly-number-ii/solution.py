class Solution:
    def nthUglyNumber(self, n: int) -> int:
        ugly = [1]
        p2 = p3 = p5 = 0

        while len(ugly) < n:
            next2, next3, next5 = ugly[p2] * 2, ugly[p3] * 3, ugly[p5] * 5
            next_ugly = min(next2, next3, next5)
            ugly.append(next_ugly)

            if next_ugly == next2:
                p2 += 1
            if next_ugly == next3:
                p3 += 1
            if next_ugly == next5:
                p5 += 1

        return ugly[-1]
