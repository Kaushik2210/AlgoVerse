import java.util.HashMap;
import java.util.Map;

class Solution {
    public String fractionToDecimal(int numerator, int denominator) {
        if (numerator == 0) {
            return "0";
        }

        StringBuilder result = new StringBuilder();
        if ((numerator < 0) != (denominator < 0)) {
            result.append("-");
        }

        long num = Math.abs((long) numerator);
        long den = Math.abs((long) denominator);
        result.append(num / den);
        long remainder = num % den;

        if (remainder == 0) {
            return result.toString();
        }

        result.append(".");
        Map<Long, Integer> seen = new HashMap<>();
        StringBuilder frac = new StringBuilder();

        while (remainder != 0) {
            if (seen.containsKey(remainder)) {
                int idx = seen.get(remainder);
                frac.insert(idx, "(");
                frac.append(")");
                break;
            }
            seen.put(remainder, frac.length());
            remainder *= 10;
            frac.append(remainder / den);
            remainder %= den;
        }

        result.append(frac);
        return result.toString();
    }
}
