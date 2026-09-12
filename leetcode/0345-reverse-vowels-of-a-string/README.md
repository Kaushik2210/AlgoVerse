# 345. Reverse Vowels of a String

Given a string `s`, reverse only the vowels (`a, e, i, o, u`, both upper and lower case) in it, leaving every other character in its original position.

**Example 1:**
```
Input: s = "IceCreAm"
Output: "AceCreIm"
Explanation: The vowels in s are ['I', 'e', 'e', 'A']. Reversed, they become ['A', 'e', 'e', 'I'], placed back in the same positions.
```

**Example 2:**
```
Input: s = "leetcode"
Output: "leotcede"
```

**Constraints:**
- 1 <= s.length <= 3 * 10^5

## Approach

Pulling all the vowels out into a separate list, reversing that list, and then reinserting them back into their original positions works, but it takes an extra pass and extra bookkeeping to track which positions were vowels.

A cleaner way is two pointers converging from opposite ends of the string (converted to a mutable list of characters first, since strings are immutable). Advance the left pointer until it lands on a vowel, and advance the right pointer backward until it lands on a vowel; once both are sitting on vowels, swap them, then step both pointers inward and repeat. Everything else in between just stays put since the pointers skip right past non-vowel characters without touching them.

This works because there's no need to know where the vowels are ahead of time — the two pointers naturally discover them in order from both ends simultaneously, and the number of vowels found from the left always matches the number found from the right by the time they meet in the middle.

**Time complexity:** O(n) — each pointer moves across the string at most once, so the total work is linear.

**Space complexity:** O(n) for the mutable character list (O(1) extra if the language allows in-place mutation of the string representation).
