from typing import List


class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        result = []
        line = []
        line_len = 0  # sum of word lengths in the current line (no spaces yet)

        for word in words:
            # +1 space needed before this word if line isn't empty
            needed = line_len + len(word) + (len(line) if line else 0)
            if line and needed > maxWidth:
                result.append(self._format_line(line, maxWidth, last=False))
                line = []
                line_len = 0

            line.append(word)
            line_len += len(word)

        if line:
            result.append(self._format_line(line, maxWidth, last=True))

        return result

    def _format_line(self, line: List[str], maxWidth: int, last: bool) -> str:
        if last or len(line) == 1:
            text = " ".join(line)
            return text + " " * (maxWidth - len(text))

        total_chars = sum(len(w) for w in line)
        gaps = len(line) - 1
        total_spaces = maxWidth - total_chars
        base_space, extra = divmod(total_spaces, gaps)

        pieces = []
        for i, word in enumerate(line[:-1]):
            spaces = base_space + (1 if i < extra else 0)
            pieces.append(word)
            pieces.append(" " * spaces)
        pieces.append(line[-1])

        return "".join(pieces)
