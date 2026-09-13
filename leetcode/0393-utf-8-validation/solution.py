from typing import List


class Solution:
    def validUtf8(self, data: List[int]) -> bool:
        remaining = 0
        for raw in data:
            byte = raw & 0xFF
            if remaining == 0:
                if byte & 0x80 == 0:
                    continue
                elif byte & 0xE0 == 0xC0:
                    remaining = 1
                elif byte & 0xF0 == 0xE0:
                    remaining = 2
                elif byte & 0xF8 == 0xF0:
                    remaining = 3
                else:
                    return False
            else:
                if byte & 0xC0 != 0x80:
                    return False
                remaining -= 1
        return remaining == 0
