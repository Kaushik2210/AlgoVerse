# 588. Design In-Memory File System

**Commonly asked at:** Google, Amazon

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-worked test cases, including nested `mkdir` auto-creating intermediate directories and appending content to an already-existing file.

Design a data structure that simulates an in-memory file system:

- `FileSystem()` — initializes the object with an empty file system (just a root directory).
- `List<String> ls(String path)` — if `path` is a file, returns a list containing just that file's name. If `path` is a directory, returns the names of everything directly inside it (files and subdirectories), in **lexicographic order**.
- `void mkdir(String path)` — creates a directory at `path`. The given path is guaranteed not to already exist. If any intermediate directories along the path don't exist yet, create them too.
- `void addContentToFile(String filePath, String content)` — if `filePath` doesn't exist, creates it with the given content. If it already exists, appends the content to whatever's already there. Also creates any missing intermediate directories along the way.
- `String readContentFromFile(String filePath)` — returns the current content of the file at `filePath`.

**Example:**
```
Input:
["FileSystem", "ls", "mkdir", "addContentToFile", "ls", "readContentFromFile"]
[[], ["/"], ["/a/b/c"], ["/a/b/c/d", "hello"], ["/"], ["/a/b/c/d"]]

Output:
[null, [], null, null, ["a"], "hello"]

Explanation:
FileSystem fs = new FileSystem();
fs.ls("/");                              // [], the root is empty
fs.mkdir("/a/b/c");                      // creates a, then a/b, then a/b/c
fs.addContentToFile("/a/b/c/d", "hello"); // creates file d under a/b/c holding "hello"
fs.ls("/");                              // ["a"], root now has one entry
fs.readContentFromFile("/a/b/c/d");      // "hello"
```

**Constraints:**
- 1 <= path.length, filePath.length <= 100
- path and filePath are absolute paths which begin with `'/'` and do not end with `'/'` except that the path is just `"/"`.
- You can assume that all directory names and file names only contain lowercase letters, digits, and `'.'` characters
- You can assume that all operations will be passed valid parameters, and users will not attempt to retrieve file content or list a directory or file that does not exist
- 1 <= content.length <= 50
- At most 300 calls will be made to `ls`, `mkdir`, `addContentToFile`, and `readContentFromFile`

## Approach

A file path (`"/a/b/c/d"`) is naturally a sequence of names to walk through, exactly like a **trie** where each node represents either a directory or a file. This maps directly onto the operations needed:

- Each node holds a map from child name -> child node, a flag for whether it's a file, and (if it's a file) an accumulated content string.
- The root is just an empty directory node.

A single shared helper, `walk(parts, create_dirs)`, does all the path traversal: split the path on `/` (filtering out empty tokens, which naturally handles both the leading `/` and the special case of `path == "/"` producing zero parts), then follow child pointers one component at a time. If `create_dirs` is true and a component doesn't exist yet, create a fresh node for it on the spot — this single flag is what makes `mkdir` and `addContentToFile` both "auto-create every missing intermediate directory" for free, without any separate logic.

- **`ls(path)`**: walk to the node (no creation). If it's a file, the answer is just its own name (the last path component) — not its contents. Otherwise, return its children's names sorted lexicographically.
- **`mkdir(path)`**: walk with `create_dirs=True` and discard the result — the walk itself creates every directory along the way.
- **`addContentToFile(filePath, content)`**: walk with `create_dirs=True` to reach (or create) the target node, mark it as a file, and append content to it. Appending rather than overwriting is what correctly handles the "already exists" case per the spec.
- **`readContentFromFile(filePath)`**: walk to the node (no creation, since the path is guaranteed to already exist per the constraints) and return its stored content.

**Time complexity:** O(d) for `mkdir` and `addContentToFile`, where d is the number of path components — each is a single hashmap lookup/insert. O(d + k log k) for `ls`, where k is the number of entries being listed (for the sort) — or O(d) if using a structure like Java's `TreeMap`/C++'s `map` that keeps children sorted automatically, as the reference solutions here do. O(d) for `readContentFromFile`.

**Space complexity:** O(total characters across all created paths and file contents) — one trie node per unique path component, plus the stored content strings.
