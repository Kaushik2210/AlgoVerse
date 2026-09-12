class Solution:
    def backspaceCompare(self, s: str, t: str) -> bool:
        def build(text: str) -> str:
            stack = []
            for ch in text:
                if ch == '#':
                    if stack:
                        stack.pop()
                else:
                    stack.append(ch)
            return ''.join(stack)

        return build(s) == build(t)
