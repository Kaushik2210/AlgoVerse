# 385. Mini Parser

You're given a string `s` representing a serialized `NestedInteger` — either a single integer like `"324"`, or a nested list like `"[123,[456,[789]]]"`, where lists can contain integers and further nested lists, comma-separated, with no extra whitespace. Deserialize `s` back into the corresponding `NestedInteger`.

**Example 1:**
```
Input: s = "324"
Output: 324
Explanation: a single integer with no nesting.
```

**Example 2:**
```
Input: s = "[123,[456,[789]]]"
Output: [123,[456,[789]]]
Explanation: 123 sits alongside a list containing 456 and a further nested list containing 789.
```

**Constraints:**
- `1 <= s.length <= 5 * 10^4`
- `s` consists of digits, `[`, `-`, `,`, `]`
- `s` is well-formed and represents a valid `NestedInteger`

## Approach

This is the reverse of problem 341's flattening — instead of reading a `NestedInteger` tree, build one from a bracketed string. `[` and `]` are exactly a stack's push/pop signal for "one level deeper" / "one level back up."

If `s` doesn't start with `[`, it's just a bare integer — parse it directly and return.

Otherwise, walk the string character by character, keeping a "current" `NestedInteger` list being built and a stack of its ancestors:
- On `[`: if there's already a current list in progress, push it onto the stack (it's now this new list's parent); start a fresh empty list as current.
- On a digit or `-`: accumulate it into a running number buffer, since numbers can be multi-digit and negative.
- On `,` or `]`: if there's a pending number in the buffer, wrap it in a `NestedInteger` and add it to the current list, then clear the buffer. `]` additionally means "this list is done" — if there's a parent on the stack, pop it, add the just-finished list to the parent, and make the parent current again.

By the end, `current` holds the fully assembled top-level `NestedInteger`.

**Time complexity:** O(n) where n is the length of `s` — each character is processed once.

**Space complexity:** O(d) for the stack, where d is the maximum nesting depth, plus O(n) for the constructed output structure itself.
