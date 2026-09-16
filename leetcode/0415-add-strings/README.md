# 415. Add Strings

**Commonly asked at:** Amazon, Facebook

You're given two non-negative integers `num1` and `num2` represented as strings. Return their sum, also as a string. You cannot use any built-in library for handling big integers, and you cannot convert the inputs directly to integers.

**Example 1:**
```
Input: num1 = "11", num2 = "123"
Output: "134"
```

**Example 2:**
```
Input: num1 = "456", num2 = "77"
Output: "533"
```

**Example 3:**
```
Input: num1 = "0", num2 = "0"
Output: "0"
```

**Constraints:**
- 1 <= num1.length, num2.length <= 10^4
- `num1` and `num2` consist only of digits, with no leading zeros (except the number "0" itself)

## Approach

This is just elementary-school addition done by hand, since we can't rely on a built-in big-integer conversion.

Walk both strings from the rightmost digit toward the front using two pointers, since that's the order digits are actually added in. At each step, pull the current digit from each string (treating a pointer that's run past its string's start as contributing 0), add them together along with any carry from the previous step, append `sum % 10` to the result, and carry `sum // 10` into the next step. Keep going until both pointers have exhausted their strings and there's no carry left. Since digits were produced from least significant to most significant, reverse the accumulated result at the end.

**Time complexity:** O(max(n, m)) where n and m are the lengths of `num1` and `num2`.

**Space complexity:** O(max(n, m)) for the result string.
