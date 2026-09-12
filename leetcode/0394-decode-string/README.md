# 394. Decode String

Given an encoded string, return its decoded string. The encoding rule is `k[encoded_string]`, meaning the `encoded_string` inside the square brackets is repeated exactly `k` times. `k` is guaranteed to be a positive integer. Encodings can nest, e.g. `2[a2[bc]]` means "repeat `a2[bc]` twice", i.e. `abcbcabcbc`. Assume the input is always valid: no extra spaces, brackets are well-formed, and digits only appear for repeat counts (never as literal digits in the string).

**Example 1:**
```
Input: s = "3[a]2[bc]"
Output: "aaabcbc"
```

**Example 2:**
```
Input: s = "3[a2[c]]"
Output: "accaccacc"
```

**Example 3:**
```
Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"
```

**Constraints:**
- 1 <= s.length <= 30
- s consists of lowercase English letters, digits, and square brackets '[]'
- s is guaranteed to be a valid input
- All the integers in s are in the range [1, 300]

## Approach

Nested brackets mean nested repeat contexts — exactly the shape a stack handles well, since entering a `[` needs to "freeze" the current progress and start fresh, while a `]` needs to "resume" whatever was frozen.

Walk the string once, maintaining a running `current_string` (what's been built so far at the current nesting level) and `current_num` (digits accumulated so far for the next repeat count):

- On a digit, accumulate it into `current_num` (multiply by 10 and add, since multi-digit counts are possible).
- On `[`, push `(current_string, current_num)` onto the stack — this snapshot is "what to return to and how many times to repeat what comes next" — then reset `current_string = ""` and `current_num = 0` to start building the bracket's contents fresh.
- On `]`, pop `(prev_string, num)` off the stack; the just-finished `current_string` gets repeated `num` times and appended onto `prev_string`, which becomes the new `current_string`.
- On any other character, just append it to `current_string`.

At the end, `current_string` holds the fully decoded result (the stack is empty since brackets are balanced).

**Time complexity:** O(n * k) where n is the length of the decoded output in the worst case — building the final string necessarily costs time proportional to its length, which can be exponential in nesting depth per the constraints.

**Space complexity:** O(n) for the stack and the strings being built, bounded by the same output-size consideration.
