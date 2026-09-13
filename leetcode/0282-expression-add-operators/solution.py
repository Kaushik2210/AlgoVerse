from typing import List


class Solution:
    def addOperators(self, num: str, target: int) -> List[str]:
        results = []
        n = len(num)

        def backtrack(index, expr, value, last_operand):
            if index == n:
                if value == target:
                    results.append(expr)
                return

            for end in range(index + 1, n + 1):
                piece = num[index:end]
                if len(piece) > 1 and piece[0] == '0':
                    break  # no leading zeros in a multi-digit operand
                operand = int(piece)

                if index == 0:
                    backtrack(end, piece, operand, operand)
                else:
                    backtrack(end, expr + '+' + piece, value + operand, operand)
                    backtrack(end, expr + '-' + piece, value - operand, -operand)
                    # undo the last operand's contribution, then apply it multiplied
                    backtrack(end, expr + '*' + piece, value - last_operand + last_operand * operand,
                              last_operand * operand)

        backtrack(0, '', 0, 0)
        return results
