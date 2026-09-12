from typing import List, Dict


class Solution:
    def diffWaysToCompute(self, expression: str) -> List[int]:
        memo: Dict[str, List[int]] = {}

        def solve(expr: str) -> List[int]:
            if expr in memo:
                return memo[expr]

            if expr.isdigit():
                memo[expr] = [int(expr)]
                return memo[expr]

            results = []
            for i, ch in enumerate(expr):
                if ch in "+-*":
                    left = solve(expr[:i])
                    right = solve(expr[i + 1:])
                    for l in left:
                        for r in right:
                            if ch == "+":
                                results.append(l + r)
                            elif ch == "-":
                                results.append(l - r)
                            else:
                                results.append(l * r)

            memo[expr] = results
            return results

        return solve(expression)
