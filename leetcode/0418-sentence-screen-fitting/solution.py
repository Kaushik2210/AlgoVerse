from typing import List


class Solution:
    def wordsTyping(self, sentence: List[str], rows: int, cols: int) -> int:
        s = ' '.join(sentence) + ' '
        total_len = len(s)
        start = 0

        for _ in range(rows):
            start += cols
            if s[start % total_len] == ' ':
                start += 1
            else:
                while start > 0 and s[(start - 1) % total_len] != ' ':
                    start -= 1

        return start // total_len
