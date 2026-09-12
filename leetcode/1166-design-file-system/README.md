# 1166. Design File System

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway because it's a clean, small illustration of using a trie to model hierarchical paths instead of strings.*

Design a simplified file system that lets you create paths and associate values with them. Implement the `FileSystem` class:

- `FileSystem()` — initializes the object.
- `boolean createPath(String path, int value)` — creates a new path and associates `value` with it. Returns `true` on success. Returns `false` if the path already exists, the path's parent doesn't exist, or the path is `"/"` (the root always exists implicitly and can't be created).
- `int get(String path)` — returns the value associated with `path`, or `-1` if the path doesn't exist.

**Example:**
```
Input:
["FileSystem", "createPath", "get", "createPath", "createPath", "get"]
[[], ["/a", 1], ["/a"], ["/a/b", 2], ["/c/d", 5], ["/a/b"]]

Output:
[null, true, 1, true, false, 2]

Explanation:
FileSystem fs = new FileSystem();
fs.createPath("/a", 1);      // true, parent "/" exists implicitly
fs.get("/a");                 // returns 1
fs.createPath("/a/b", 2);    // true, parent "/a" exists
fs.createPath("/c/d", 5);    // false, parent "/c" doesn't exist
fs.get("/a/b");               // returns 2
```

**Constraints:**
- 2 <= path.length <= 100
- 1 <= value <= 10^9
- Each path is valid, starts with '/', has each directory/file name consist of only lowercase letters, digits, and/or '_', and does not end with '/'
- At most 10^4 calls total to createPath and get

## Approach

A filesystem path is naturally a sequence of components separated by `/`, which is exactly what a **trie** models well — except instead of individual characters as the trie's alphabet, each trie node's "character" is a whole path component (a directory or file name). So this is a standard trie, just built one path segment at a time instead of one letter at a time.

Each trie node holds a map from component name to child node, plus a `value` (defaulting to "doesn't exist," e.g. `None`/`null`) and maybe a `has_value` flag to distinguish "this node exists with no value set" from "this node was explicitly created."

For `createPath(path, value)`: split the path into its components. Walk the trie from the root through all but the last component — if any of those intermediate nodes doesn't exist, the parent path is missing, so return `false`. Once at the parent node, check whether a child already exists for the final component — if it does, the path already exists, return `false`. Otherwise create that child node, store `value` on it, and return `true`.

For `get(path)`: split into components and walk the trie the same way. If the walk falls off the trie at any point, the path doesn't exist, return `-1`. Otherwise return the value stored at the final node.

**Time complexity:** O(L) per call, where L is the number of components in the path (splitting the string and walking the trie are both linear in path length).

**Space complexity:** O(N) where N is the total length of all created paths, for the trie nodes.
