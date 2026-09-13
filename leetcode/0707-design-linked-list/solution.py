class _Node:
    def __init__(self, val=0):
        self.val = val
        self.prev = None
        self.next = None


class MyLinkedList:
    def __init__(self):
        # Dummy head/tail sentinels so add/remove at either end never needs
        # a special case for an empty list.
        self.head = _Node()
        self.tail = _Node()
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0

    def _node_at(self, index: int) -> _Node:
        # Walk from whichever end is closer to cut the traversal in half.
        if index < self.size - index:
            node = self.head.next
            for _ in range(index):
                node = node.next
        else:
            node = self.tail.prev
            for _ in range(self.size - 1 - index):
                node = node.prev
        return node

    def get(self, index: int) -> int:
        if index < 0 or index >= self.size:
            return -1
        return self._node_at(index).val

    def addAtHead(self, val: int) -> None:
        self._insert_before(self.head.next, val)

    def addAtTail(self, val: int) -> None:
        self._insert_before(self.tail, val)

    def addAtIndex(self, index: int, val: int) -> None:
        if index > self.size:
            return
        if index <= 0:
            self.addAtHead(val)
            return
        self._insert_before(self._node_at(index), val)

    def deleteAtIndex(self, index: int) -> None:
        if index < 0 or index >= self.size:
            return
        node = self._node_at(index)
        node.prev.next = node.next
        node.next.prev = node.prev
        self.size -= 1

    def _insert_before(self, node: _Node, val: int) -> None:
        new_node = _Node(val)
        prev_node = node.prev
        prev_node.next = new_node
        new_node.prev = prev_node
        new_node.next = node
        node.prev = new_node
        self.size += 1


# Your MyLinkedList object will be instantiated and called as such:
# obj = MyLinkedList()
# param_1 = obj.get(index)
# obj.addAtHead(val)
# obj.addAtTail(val)
# obj.addAtIndex(index,val)
# obj.deleteAtIndex(index)
