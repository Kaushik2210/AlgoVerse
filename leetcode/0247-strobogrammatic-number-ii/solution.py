from typing import List


class Solution:
    def findStrobogrammatic(self, n: int) -> List[str]:
        pairs = [('0', '0'), ('1', '1'), ('6', '9'), ('8', '8'), ('9', '6')]

        def build(length, total):
            if length == 0:
                return ['']
            if length == 1:
                return ['0', '1', '8']

            inner = build(length - 2, total)
            results = []
            for left, right in pairs:
                # the outermost layer can't start with '0' unless the whole number is "0"
                if left == '0' and length == total:
                    continue
                for mid in inner:
                    results.append(left + mid + right)
            return results

        return build(n, n)
