class Solution {
public:
    int myAtoi(string s) {
        int i = 0;
        int n = (int)s.size();

        while (i < n && s[i] == ' ') {
            i++;
        }

        if (i == n) {
            return 0;
        }

        int sign = 1;
        if (s[i] == '+' || s[i] == '-') {
            if (s[i] == '-') {
                sign = -1;
            }
            i++;
        }

        long result = 0;
        while (i < n && isdigit(s[i])) {
            int digit = s[i] - '0';
            result = result * 10 + digit;
            if (sign == 1 && result > INT_MAX) {
                return INT_MAX;
            }
            if (sign == -1 && -result < INT_MIN) {
                return INT_MIN;
            }
            i++;
        }

        return (int)(sign * result);
    }
};
