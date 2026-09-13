class Solution:
    def calculate(self, s: str) -> int:
        self.i = 0

        def evaluate() -> int:
            stack = []
            num = 0
            op = '+'

            while self.i < len(s):
                ch = s[self.i]
                if ch == ' ':
                    self.i += 1
                    continue
                if ch.isdigit():
                    num = num * 10 + int(ch)
                    self.i += 1
                    continue
                if ch == '(':
                    self.i += 1
                    num = evaluate()
                    self._apply(stack, op, num)
                    op = None
                    num = 0
                    if self.i < len(s) and s[self.i] == ')':
                        self.i += 1
                    if self.i < len(s) and s[self.i] in '+-*/':
                        op = s[self.i]
                        self.i += 1
                    continue
                if ch == ')':
                    self._apply(stack, op, num)
                    return sum(stack)
                if ch in '+-*/':
                    self._apply(stack, op, num)
                    op = ch
                    num = 0
                    self.i += 1
                    continue

            self._apply(stack, op, num)
            return sum(stack)

        return evaluate()

    def _apply(self, stack, op, num):
        if op is None:
            return
        if op == '+':
            stack.append(num)
        elif op == '-':
            stack.append(-num)
        elif op == '*':
            stack.append(stack.pop() * num)
        elif op == '/':
            prev = stack.pop()
            quotient = abs(prev) // num
            stack.append(quotient if (prev >= 0) == (num >= 0) else -quotient)
