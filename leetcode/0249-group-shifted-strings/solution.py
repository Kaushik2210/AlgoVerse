from typing import List
from collections import defaultdict


class Solution:
    def groupStrings(self, strings: List[str]) -> List[List[str]]:
        groups = defaultdict(list)
        for s in strings:
            key = tuple((ord(c) - ord(s[0])) % 26 for c in s)
            groups[key].append(s)
        return list(groups.values())
