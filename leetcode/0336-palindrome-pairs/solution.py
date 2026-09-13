from typing import List
from collections import defaultdict


class Solution:
    def palindromePairs(self, words: List[str]) -> List[List[int]]:
        # map word -> list of indices, so exact duplicate words (e.g. two copies
        # of the same palindrome) are still all found as valid pairs
        indices_of = defaultdict(list)
        for i, word in enumerate(words):
            indices_of[word].append(i)

        def is_palindrome(s: str) -> bool:
            return s == s[::-1]

        result = []
        for i, word in enumerate(words):
            n = len(word)
            for k in range(n + 1):
                left, right = word[:k], word[k:]

                # case A: left half is already a palindrome, and the reverse of the
                # right half exists as another word -> reverse(right) + word is a palindrome
                # (reverse(right) + left + right, with left a palindrome, mirrors around it)
                if is_palindrome(left):
                    rev_right = right[::-1]
                    for j in indices_of.get(rev_right, ()):
                        if j != i:
                            result.append([j, i])

                # case B: right half is a palindrome (and non-empty split, to avoid
                # double counting the k == n case already handled by case A with left="")
                # -> word + reverse(left) is a palindrome
                if k != n and is_palindrome(right):
                    rev_left = left[::-1]
                    for j in indices_of.get(rev_left, ()):
                        if j != i:
                            result.append([i, j])

        return result
