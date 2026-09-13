# 631. Design Excel Sum Formula

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently, including a chained-formula test (A1 feeds a `sum` formula in B2, which feeds another `sum` formula in C3, and changing A1 correctly propagates all the way through to C3).

Design the basic functionality of Excel and implement a sum formula:

- `Excel(int height, char width)` — initializes an object with a sheet of size `height x width`. Rows are numbered `1` to `height`, columns are lettered `'A'` to `width`. Every cell starts at 0.
- `void set(int row, char column, int val)` — sets the raw value at `(row, column)` to `val`. This overwrites and cancels any formula that cell previously held.
- `int get(int row, char column)` — returns the current value at `(row, column)`.
- `int sum(int row, char column, List<String> numbers)` — sets `(row, column)` to a **formula**: the sum of every cell referenced in `numbers`, and returns that sum. This formula stays in effect — meaning the cell keeps recomputing live from its referenced cells — until the cell is overwritten by another `set` or `sum` call. Each entry in `numbers` is either:
  - `"ColRow"` — a single cell, e.g. `"F7"` is `mat[7]['F']`.
  - `"ColRow1:ColRow2"` — a rectangular range, e.g. `"B3:F7"` is every cell `mat[i][j]` for `3 <= i <= 7` and `'B' <= j <= 'F'`.

It's guaranteed there is never a circular formula reference.

**Example:**
```
Input:
["Excel", "set", "sum", "get", "set", "get"]
[[3, "C"], [1, "A", 2], [3, "C", ["A1", "A1:B2"]], [3, "C"], [2, "B", 2], [3, "C"]]

Output:
[null, null, 4, 4, null, 6]

Explanation:
Excel excel = new Excel(3, "C");
excel.set(1, "A", 2);                        // A1 = 2
excel.sum(3, "C", ["A1", "A1:B2"]);          // C3 = A1 + sum(A1:B2) = 2 + (2+0+0+0) = 4
excel.get(3, "C");                            // 4
excel.set(2, "B", 2);                         // B2 = 2, C3's formula still references it live
excel.get(3, "C");                            // C3 recomputes: A1(2) + sum(A1:B2 = 2+0+0+2) = 6
```

**Constraints:**
- 1 <= height <= 26
- 'A' <= width <= 'Z'
- 1 <= row <= height
- 'A' <= column <= width
- -100 <= val <= 100
- 1 <= numbers.length <= 5
- numbers[i] has the format "ColRow" or "ColRow1:ColRow2"
- It's guaranteed that there will not be any circular sum reference

## Approach

The core design decision is what a formula cell should actually *store*. It's tempting to compute and cache the sum immediately, but that breaks the moment any of the referenced cells changes later — the problem explicitly requires the formula to stay "live," recomputing whenever a dependency changes (that's exactly what happens to C3 in the example when B2 is set after the formula was created).

So a formula cell stores not a value but a **list of cell references it depends on** — a small dependency graph, essentially, expressed as an adjacency list keyed by `(row, col)`. `get` on any cell is a small recursive evaluator:

- If the cell has a stored formula, its value is the sum of `get()` on every cell it references — which recurses further if any of *those* cells are themselves formulas (this is what makes chained formulas like A1 -> B2 -> C3 work correctly without any extra bookkeeping).
- If the cell has no formula, it's just a raw value sitting in the sheet matrix.

**`set(row, col, val)`** does two things: writes the raw value, and — critically — deletes any formula that cell used to have, since a plain `set` overwrites a formula entirely per the problem statement (this is exactly why `set` isn't just "assign a raw value," it also has to un-formula-ify the cell).

**`sum(row, col, numbers)`** parses each token in `numbers` into a flat list of individual `(row, col)` cell coordinates — a single `"F7"` token becomes one coordinate, while a range token `"B3:F7"` gets expanded into every coordinate in that rectangle by iterating rows and columns between the two corners. That flattened list becomes the new formula stored for `(row, col)`, replacing whatever was there before (including if it was a formula that referenced a completely different set of cells). It then returns `get(row, col)` to report the freshly (re)computed value.

Because the problem guarantees no circular references, the recursive `get` always terminates — there's no cycle-detection needed.

**Time complexity:** O(1) for `set`. O(R) for `sum`, where R is the total number of cells the range tokens expand to (bounded by height * width, since ranges never exceed the sheet). `get` is O(d) where d is the total size of the dependency chain being walked — in the worst case a long chain of formulas each referencing many cells, but bounded by the sheet size since there's no cycling.

**Space complexity:** O(height * width) for the sheet matrix, plus O(sum of formula sizes) for the stored dependency lists — at most one list per cell, each of size at most height * width.
