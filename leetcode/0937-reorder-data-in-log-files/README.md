# 937. Reorder Data in Log Files

**Commonly asked at:** Amazon

You're given an array of logs, each formatted as `"identifier rest-of-content"`. A log is either a **letter-log** (the content after the identifier is all lowercase letters, possibly space-separated words) or a **digit-log** (the content is digits). Reorder the logs so that all letter-logs come first, sorted by their content; ties in content are broken by the identifier. Digit-logs come after all letter-logs, keeping their original relative order.

**Example 1:**
```
Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
```

**Example 2:**
```
Input: logs = ["a1 9 2 3 1","g1 act car","zo4 4 7","ab1 off key dog","a8 act zoo"]
Output: ["g1 act car","a8 act zoo","ab1 off key dog","a1 9 2 3 1","zo4 4 7"]
```

**Constraints:**
- 1 <= logs.length <= 100
- 3 <= logs[i].length <= 100
- All identifiers consist of lowercase letters and digits, and are separated by exactly one space from the rest of the content
- Each logs[i] starts with an identifier

## Approach

Split the logs into two buckets by peeking at the first character after the identifier: if it's a digit, it's a digit-log; otherwise it's a letter-log. Digit-logs just get carried through unchanged in their original order (a stable partition handles that automatically).

Letter-logs need a real sort, but the sort key is directly stated by the problem: primarily the content (everything after the identifier), secondarily the identifier itself as a tiebreaker. Sort the letter-logs by the tuple `(content, identifier)`.

Finally, concatenate the sorted letter-logs followed by the digit-logs (in their original relative order) for the answer.

**Time complexity:** O(n log n * k) where n is the number of logs and k is the average log length — dominated by the sort, and string comparisons themselves cost up to O(k).

**Space complexity:** O(n) for the two buckets and the output.
