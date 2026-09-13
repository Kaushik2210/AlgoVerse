import heapq


class Solution:
    def longestDiverseString(self, a: int, b: int, c: int) -> str:
        heap = []
        for count, ch in [(-a, 'a'), (-b, 'b'), (-c, 'c')]:
            if count < 0:
                heapq.heappush(heap, [count, ch])

        result = []
        while heap:
            count, ch = heapq.heappop(heap)
            if len(result) >= 2 and result[-1] == ch and result[-2] == ch:
                if not heap:
                    break
                count2, ch2 = heapq.heappop(heap)
                result.append(ch2)
                count2 += 1
                if count2 < 0:
                    heapq.heappush(heap, [count2, ch2])
                heapq.heappush(heap, [count, ch])
            else:
                result.append(ch)
                count += 1
                if count < 0:
                    heapq.heappush(heap, [count, ch])

        return ''.join(result)
