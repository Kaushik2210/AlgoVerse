# 336. Palindrome Pairs

You're given a list of **unique** strings `words`. Find every pair of distinct indices `(i, j)` such that `words[i] + words[j]` (concatenated in that order) forms a palindrome. Return all such pairs.

**Example 1:**
```
Input: words = ["abcd","dcba","lls","s","sssll"]
Output: [[0,1],[1,0],[3,2],[2,4]]
Explanation: "abcd"+"dcba"="abcddcba" and "dcba"+"abcd"="dcbaabcd" are both palindromes.
"s"+"lls"="slls" and "lls"+"sssll"="llssssll" are both palindromes.
```

**Example 2:**
```
Input: words = ["bat","tab","cat"]
Output: [[0,1],[1,0]]
```

**Constraints:**
- 1 <= words.length <= 5000
- 0 <= words[i].length <= 300
- words[i] consists of lowercase English letters

## Approach

Checking every pair directly is O(n^2 * L) and too slow. The key insight is that whether `words[i] + words[j]` can be a palindrome is really a question about **splitting `words[i]` itself** — for it to combine into a palindrome with some other word, one side of some split of `words[i]` has to already be a palindrome, and the other side's reverse has to be sitting in the word list.

Concretely, split `word = words[i]` at every possible position `k` into `left = word[:k]` and `right = word[k:]`:

- **Case A** — if `left` is a palindrome, then gluing `reverse(right)` onto the front of `word` produces `reverse(right) + left + right`. Since `left` is a palindrome, this whole thing mirrors perfectly as long as `reverse(right)` exists as another word `j` in the list — giving the pair `(j, i)`.
- **Case B** — symmetrically, if `right` is a palindrome, then `word + reverse(left)` gives `left + right + reverse(left)`, which mirrors around the palindromic `right` as long as `reverse(left)` exists as another word `j` — giving the pair `(i, j)`.

Running both checks at every split point `k` from `0` to `len(word)` covers every way `word` could pair with something else. The `k == len(word)` split (empty `right`) is already covered by case A with `left = word` — an empty string is trivially a palindrome, so it's skipped in case B to avoid emitting the same pair twice.

A hash map from word to its index (using a list of indices to be safe against duplicate words) gives O(1) lookups for the reversed pieces. Checking `is_palindrome` on a slice up to length L costs O(L), and there are O(L) splits per word, so the whole thing runs in O(L^2) per word instead of comparing against every other word.

**Time complexity:** O(n * L^2) where n is the number of words and L is the max word length — for each word, O(L) splits, each doing an O(L) palindrome check and slice/reverse.

**Space complexity:** O(n * L) for the hash map of words to indices, plus O(k) for the output where k is the number of valid pairs.
