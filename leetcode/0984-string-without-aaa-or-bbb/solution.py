class Solution:
    def strWithout3a3b(self, a: int, b: int) -> str:
        result = []

        while a > 0 or b > 0:
            n = len(result)
            last_two_same = n >= 2 and result[-1] == result[-2]

            if last_two_same:
                # forced to use the other letter
                if result[-1] == 'a':
                    result.append('b')
                    b -= 1
                else:
                    result.append('a')
                    a -= 1
            else:
                # free choice: take whichever letter has more left
                if a >= b and a > 0:
                    result.append('a')
                    a -= 1
                else:
                    result.append('b')
                    b -= 1

        return ''.join(result)
