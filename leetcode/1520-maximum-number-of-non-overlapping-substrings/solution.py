from typing import List


class Solution:
    def maxNumOfSubstrings(self, s: str) -> List[str]:
        first = {}
        last = {}
        for i, c in enumerate(s):
            if c not in first:
                first[c] = i
            last[c] = i

        # build the minimal valid interval starting at each character's
        # first occurrence, expanding until every char inside it is fully contained
        intervals = []
        for i, c in enumerate(s):
            if first[c] != i:
                continue  # only try starting at a character's first appearance

            end = last[c]
            j = i
            valid = True
            while j <= end:
                cj = s[j]
                if first[cj] < i:
                    # some char in this range also appears before i,
                    # so no valid interval can start exactly at i
                    valid = False
                    break
                end = max(end, last[cj])
                j += 1

            if valid:
                intervals.append((i, end))

        # classic greedy interval scheduling: sort by end, take earliest-finishing
        # non-overlapping intervals first to maximize the count picked
        intervals.sort(key=lambda pair: pair[1])
        result = []
        prev_end = -1
        for start, end in intervals:
            if start > prev_end:
                result.append(s[start:end + 1])
                prev_end = end

        return result
