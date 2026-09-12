class Solution:
    def calculate(self, s: str) -> int:
        stack = []
        num = 0
        op = "+"
        n = len(s)

        for i, ch in enumerate(s):
            if ch.isdigit():
                num = num * 10 + int(ch)

            if (not ch.isdigit() and ch != " ") or i == n - 1:
                if op == "+":
                    stack.append(num)
                elif op == "-":
                    stack.append(-num)
                elif op == "*":
                    stack.append(stack.pop() * num)
                elif op == "/":
                    stack.append(int(stack.pop() / num))  # truncate toward zero
                op = ch
                num = 0

        return sum(stack)
