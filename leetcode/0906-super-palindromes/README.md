# 906. Super Palindromes

A positive integer is a super-palindrome if it's a palindrome itself, and its square root (taken as an integer) is also a palindrome. Given two positive integers `left` and `right` as strings, return how many super-palindromes exist in the inclusive range `[left, right]`.

**Example 1:**
```
Input: left = "4", right = "1000"
Output: 4
Explanation: 4, 9, 121, and 484 are super-palindromes. 4 = 2*2, 9 = 3*3, 121 = 11*11, 484 = 22*22, and each of 4, 9, 121, 484, 2, 3, 11, 22 is itself a palindrome.
```

**Example 2:**
```
Input: left = "1", right = "2"
Output: 1
```

**Constraints:**
- 1 <= left.length, right.length <= 18
- left and right consist of only digits
- left <= right

## Approach

Checking every number in `[left, right]` for being a super-palindrome directly is hopeless — the range can span up to 10^18 values. The way in is to flip the search around: instead of scanning candidate squares, generate candidate *roots*.

A super-palindrome's root R must satisfy R*R <= right <= 10^18, so R itself is at most about 10^9 — and R has to be a palindrome. Palindromes are cheap to enumerate directly: pick a "seed" for the first half of the digits, then mirror it to build the full palindrome, rather than testing every number for the palindrome property one at a time.

Since R <= ~10^9, R has at most 10 digits, meaning its first half (the seed) has at most 5 digits — so seeds from 1 up to 99999 cover every possible palindrome root in range. For each seed, build two roots: an even-length palindrome (mirror the whole seed) and an odd-length one (mirror the seed minus its last digit, so the middle digit isn't duplicated). Square each root, and if the square falls within `[left, right]` and the square itself is also a palindrome (as a string), count it.

This shrinks the search from "test up to 10^18 numbers" down to "test roughly 2*10^5 candidate roots," each with a cheap string-palindrome check.

**Time complexity:** O(S * D), where S is the number of seeds (~10^5) and D is the digit length of the numbers involved — dominated by building strings and reversing them, so effectively O(10^5) with small constant work per seed.

**Space complexity:** O(D) per candidate for the string manipulation, no large storage needed.
