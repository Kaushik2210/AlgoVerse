# 707. Design Linked List

**Commonly asked at:** Amazon, Google

Design your own implementation of a linked list, supporting both singly and doubly linked list operations transparently. Implement the `MyLinkedList` class:

- `MyLinkedList()` — initializes an empty linked list.
- `int get(index)` — returns the value at `index`, or -1 if the index is invalid.
- `void addAtHead(val)` — inserts a node with value `val` before the first element.
- `void addAtTail(val)` — appends a node with value `val` after the last element.
- `void addAtIndex(index, val)` — inserts a node with value `val` before the node at `index`. If `index` equals the current length, the node is appended to the end. If `index` is greater than the length, nothing happens.
- `void deleteAtIndex(index)` — deletes the node at `index`, if valid.

**Example:**
```
Input:
["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]
[[], [1], [3], [1, 2], [1], [1], [1]]

Output:
[null, null, null, null, 2, null, 3]

Explanation:
MyLinkedList list = new MyLinkedList();
list.addAtHead(1);        // list is 1
list.addAtTail(3);        // list is 1 -> 3
list.addAtIndex(1, 2);    // list is 1 -> 2 -> 3
list.get(1);              // returns 2
list.deleteAtIndex(1);    // list is 1 -> 3
list.get(1);              // returns 3
```

**Constraints:**
- 0 <= index, val <= 1000
- At most 2000 calls total to get, addAtHead, addAtTail, addAtIndex, and deleteAtIndex

## Approach

The most literal way to build this is with plain singly linked nodes: a `head` pointer, walk forward to reach an index, splice a node in by rewiring one `next` pointer. That works and is enough to pass, but `addAtTail` then costs O(n) every time since you'd have to walk to the end, and there's no cheap way to approach an index from the back.

Doing it as a **doubly linked list with dummy head/tail sentinels** removes both of those rough edges. Two sentinel nodes bookend the real data (`head.next` is the first real node, `tail.prev` is the last), so head and tail insertion are trivially "insert before `head.next`" / "insert before `tail`" — no empty-list special case needed since the sentinels are always there. Keeping an explicit `size` counter lets `get`/`addAtIndex`/`deleteAtIndex` pick whichever end is closer (`index` vs. `size - index`) and walk from there, halving the average traversal distance compared to always starting from the head. Every insert/delete is then just relinking four pointers around the target node.

**Time complexity:** O(min(index, n - index)) for `get`, `addAtIndex`, and `deleteAtIndex`; O(1) for `addAtHead` and `addAtTail`.

**Space complexity:** O(n) to hold the n stored nodes, plus O(1) for the two sentinels.
