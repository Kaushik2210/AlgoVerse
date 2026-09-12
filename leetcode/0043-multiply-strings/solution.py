class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        if num1 == "0" or num2 == "0":
            return "0"

        n1, n2 = len(num1), len(num2)
        result = [0] * (n1 + n2)

        for i in range(n1 - 1, -1, -1):
            d1 = ord(num1[i]) - ord('0')
            for j in range(n2 - 1, -1, -1):
                d2 = ord(num2[j]) - ord('0')
                total = d1 * d2 + result[i + j + 1]
                result[i + j + 1] = total % 10
                result[i + j] += total // 10

        # strip leading zeros
        start = 0
        while start < len(result) - 1 and result[start] == 0:
            start += 1

        return ''.join(map(str, result[start:]))
