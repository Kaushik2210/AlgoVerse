# 71. Simplify Path

You're given an absolute Unix-style file path as a string `path`. Convert it to the simplified canonical path.

The rules: the path starts with `/`, directories are separated by `/`, a single `.` refers to the current directory, `..` refers to the parent directory, and multiple consecutive slashes (`//`) are treated as one. The canonical path should start with a single `/`, directories are separated by exactly one `/`, it doesn't end with a trailing `/` (unless it's the root `/`), and it doesn't contain `.` or `..` as path components. If `..` would go above the root, it's simply ignored (root has no parent).

**Example 1:**
```
Input: path = "/home/"
Output: "/home"
```

**Example 2:**
```
Input: path = "/home//foo/"
Output: "/home/foo"
```

**Example 3:**
```
Input: path = "/home/user/Documents/../Pictures"
Output: "/home/user/Pictures"
```

**Example 4:**
```
Input: path = "/../"
Output: "/"
```

**Example 5:**
```
Input: path = "/.../a/../b/c/../d/./"
Output: "/.../b/d"
Explanation: "..." is just a regular directory name, not a parent reference — only the exact token ".." means "go up".
```

**Constraints:**
- 1 <= path.length <= 3000
- path consists of English letters, digits, `.`, `/`, `_`, `~`
- path is a valid absolute Unix path

## Approach

Split the path on `/` and process each resulting segment with a **stack**:

- Empty segments (from consecutive slashes) and `.` segments: skip, they don't change the directory.
- `..` segments: pop the stack if it's non-empty (going up from root is a no-op — nowhere to go).
- Anything else (a real directory/file name, including odd-looking ones like `...` or `..hidden`): push it onto the stack.

After processing every segment, join the stack with `/` and prepend a leading `/`. If the stack ended up empty, the answer is just `/`.

The key insight is that `..` is only special as a *whole path component*, so splitting on `/` first and comparing each component exactly to `.` or `..` avoids ambiguity with names that merely contain dots.

**Time complexity:** O(n) where n is the length of `path` — each character is visited a constant number of times across the split and stack operations.

**Space complexity:** O(n) for the stack and the split segments.
