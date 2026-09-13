from typing import List


class Solution:
    def letterCasePermutation(self, s: str) -> List[str]:
        result = []
        chars = list(s)

        def backtrack(index: int) -> None:
            if index == len(chars):
                result.append(''.join(chars))
                return

            if chars[index].isalpha():
                original = chars[index]

                chars[index] = original.lower()
                backtrack(index + 1)

                chars[index] = original.upper()
                backtrack(index + 1)

                chars[index] = original
            else:
                backtrack(index + 1)

        backtrack(0)
        return result
