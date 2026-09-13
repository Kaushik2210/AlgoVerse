class MyLinkedList {
    private static class Node {
        int val;
        Node prev;
        Node next;
        Node(int val) { this.val = val; }
    }

    private final Node head;
    private final Node tail;
    private int size;

    public MyLinkedList() {
        head = new Node(0);
        tail = new Node(0);
        head.next = tail;
        tail.prev = head;
        size = 0;
    }

    private Node nodeAt(int index) {
        Node node;
        if (index < size - index) {
            node = head.next;
            for (int i = 0; i < index; i++) node = node.next;
        } else {
            node = tail.prev;
            for (int i = 0; i < size - 1 - index; i++) node = node.prev;
        }
        return node;
    }

    public int get(int index) {
        if (index < 0 || index >= size) return -1;
        return nodeAt(index).val;
    }

    public void addAtHead(int val) {
        insertBefore(head.next, val);
    }

    public void addAtTail(int val) {
        insertBefore(tail, val);
    }

    public void addAtIndex(int index, int val) {
        if (index > size) return;
        if (index <= 0) {
            addAtHead(val);
            return;
        }
        insertBefore(nodeAt(index), val);
    }

    public void deleteAtIndex(int index) {
        if (index < 0 || index >= size) return;
        Node node = nodeAt(index);
        node.prev.next = node.next;
        node.next.prev = node.prev;
        size--;
    }

    private void insertBefore(Node node, int val) {
        Node newNode = new Node(val);
        Node prevNode = node.prev;
        prevNode.next = newNode;
        newNode.prev = prevNode;
        newNode.next = node;
        node.prev = newNode;
        size++;
    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * MyLinkedList obj = new MyLinkedList();
 * int param_1 = obj.get(index);
 * obj.addAtHead(val);
 * obj.addAtTail(val);
 * obj.addAtIndex(index,val);
 * obj.deleteAtIndex(index);
 */
