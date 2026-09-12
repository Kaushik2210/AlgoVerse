class Solution:
    def calculate(self, s: str) -> int:
        stack = []  # (result_so_far, sign) saved across '('
        result = 0
        sign = 1
        i = 0
        n = len(s)

        while i < n:
            ch = s[i]

            if ch.isdigit():
                num = 0
                while i < n and s[i].isdigit():
                    num = num * 10 + int(s[i])
                    i += 1
                result += sign * num
                continue  # already advanced i past the number
            elif ch == '+':
                sign = 1
            elif ch == '-':
                sign = -1
            elif ch == '(':
                stack.append((result, sign))
                result = 0
                sign = 1
            elif ch == ')':
                prev_result, prev_sign = stack.pop()
                result = prev_result + prev_sign * result
            # spaces: do nothing

            i += 1

        return result
