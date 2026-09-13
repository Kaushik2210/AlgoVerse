class _Node:
    __slots__ = ("count", "keys", "prev", "next")

    def __init__(self, count=0):
        self.count = count
        self.keys = set()
        self.prev = None
        self.next = None


class AllOne:
    def __init__(self):
        # sentinels: head.next is the lowest-count bucket, tail.prev is the highest-count bucket
        self.head = _Node()
        self.tail = _Node()
        self.head.next = self.tail
        self.tail.prev = self.head
        self.key_count = {}  # key -> current count
        self.key_node = {}   # key -> bucket node currently holding it

    def _insert_after(self, node, count):
        new_node = _Node(count)
        new_node.prev = node
        new_node.next = node.next
        node.next.prev = new_node
        node.next = new_node
        return new_node

    def _insert_before(self, node, count):
        new_node = _Node(count)
        new_node.next = node
        new_node.prev = node.prev
        node.prev.next = new_node
        node.prev = new_node
        return new_node

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def inc(self, key: str) -> None:
        if key not in self.key_count:
            self.key_count[key] = 1
            if self.head.next is self.tail or self.head.next.count != 1:
                node = self._insert_after(self.head, 1)
            else:
                node = self.head.next
            node.keys.add(key)
            self.key_node[key] = node
            return

        cur_node = self.key_node[key]
        new_count = self.key_count[key] + 1
        self.key_count[key] = new_count
        cur_node.keys.remove(key)

        if cur_node.next is self.tail or cur_node.next.count != new_count:
            new_node = self._insert_after(cur_node, new_count)
        else:
            new_node = cur_node.next
        new_node.keys.add(key)
        self.key_node[key] = new_node

        if not cur_node.keys:
            self._remove(cur_node)

    def dec(self, key: str) -> None:
        if key not in self.key_count:
            return

        cur_node = self.key_node[key]
        cur_count = self.key_count[key]
        cur_node.keys.remove(key)

        if cur_count == 1:
            del self.key_count[key]
            del self.key_node[key]
        else:
            new_count = cur_count - 1
            self.key_count[key] = new_count
            if cur_node.prev is self.head or cur_node.prev.count != new_count:
                new_node = self._insert_before(cur_node, new_count)
            else:
                new_node = cur_node.prev
            new_node.keys.add(key)
            self.key_node[key] = new_node

        if not cur_node.keys:
            self._remove(cur_node)

    def getMaxKey(self) -> str:
        if self.tail.prev is self.head:
            return ""
        return next(iter(self.tail.prev.keys))

    def getMinKey(self) -> str:
        if self.head.next is self.tail:
            return ""
        return next(iter(self.head.next.keys))


# Your AllOne object will be instantiated and called as such:
# obj = AllOne()
# obj.inc(key)
# obj.dec(key)
# param_3 = obj.getMaxKey()
# param_4 = obj.getMinKey()
