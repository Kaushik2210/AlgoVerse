class Solution:
    def fractionToDecimal(self, numerator: int, denominator: int) -> str:
        if numerator == 0:
            return "0"

        result = []
        if (numerator < 0) != (denominator < 0):
            result.append("-")

        numerator, denominator = abs(numerator), abs(denominator)
        result.append(str(numerator // denominator))
        remainder = numerator % denominator

        if remainder == 0:
            return "".join(result)

        result.append(".")
        seen = {}
        frac = []

        while remainder != 0:
            if remainder in seen:
                idx = seen[remainder]
                frac.insert(idx, "(")
                frac.append(")")
                break
            seen[remainder] = len(frac)
            remainder *= 10
            frac.append(str(remainder // denominator))
            remainder %= denominator

        result.append("".join(frac))
        return "".join(result)
