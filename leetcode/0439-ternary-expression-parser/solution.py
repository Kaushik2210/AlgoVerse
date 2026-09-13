class Solution:
    def parseTernary(self, expression: str) -> str:
        stack = []

        for ch in reversed(expression):
            if stack and stack[-1] == '?':
                stack.pop()          # discard '?'
                true_branch = stack.pop()
                stack.pop()          # discard ':'
                false_branch = stack.pop()
                stack.append(true_branch if ch == 'T' else false_branch)
            else:
                stack.append(ch)

        return stack[0]
