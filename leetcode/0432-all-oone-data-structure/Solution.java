import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class AllOne {
    private class Node {
        int count;
        Set<String> keys = new HashSet<>();
        Node prev, next;
        Node(int count) { this.count = count; }
    }

    private final Node head = new Node(0);
    private final Node tail = new Node(0);
    private final Map<String, Integer> keyCount = new HashMap<>();
    private final Map<String, Node> keyNode = new HashMap<>();

    public AllOne() {
        head.next = tail;
        tail.prev = head;
    }

    private Node insertAfter(Node node, int count) {
        Node newNode = new Node(count);
        newNode.prev = node;
        newNode.next = node.next;
        node.next.prev = newNode;
        node.next = newNode;
        return newNode;
    }

    private Node insertBefore(Node node, int count) {
        Node newNode = new Node(count);
        newNode.next = node;
        newNode.prev = node.prev;
        node.prev.next = newNode;
        node.prev = newNode;
        return newNode;
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    public void inc(String key) {
        if (!keyCount.containsKey(key)) {
            keyCount.put(key, 1);
            Node node;
            if (head.next == tail || head.next.count != 1) {
                node = insertAfter(head, 1);
            } else {
                node = head.next;
            }
            node.keys.add(key);
            keyNode.put(key, node);
            return;
        }

        Node curNode = keyNode.get(key);
        int newCount = keyCount.get(key) + 1;
        keyCount.put(key, newCount);
        curNode.keys.remove(key);

        Node newNode;
        if (curNode.next == tail || curNode.next.count != newCount) {
            newNode = insertAfter(curNode, newCount);
        } else {
            newNode = curNode.next;
        }
        newNode.keys.add(key);
        keyNode.put(key, newNode);

        if (curNode.keys.isEmpty()) remove(curNode);
    }

    public void dec(String key) {
        if (!keyCount.containsKey(key)) return;

        Node curNode = keyNode.get(key);
        int curCount = keyCount.get(key);
        curNode.keys.remove(key);

        if (curCount == 1) {
            keyCount.remove(key);
            keyNode.remove(key);
        } else {
            int newCount = curCount - 1;
            keyCount.put(key, newCount);
            Node newNode;
            if (curNode.prev == head || curNode.prev.count != newCount) {
                newNode = insertBefore(curNode, newCount);
            } else {
                newNode = curNode.prev;
            }
            newNode.keys.add(key);
            keyNode.put(key, newNode);
        }

        if (curNode.keys.isEmpty()) remove(curNode);
    }

    public String getMaxKey() {
        if (tail.prev == head) return "";
        return tail.prev.keys.iterator().next();
    }

    public String getMinKey() {
        if (head.next == tail) return "";
        return head.next.keys.iterator().next();
    }
}

/**
 * Your AllOne object will be instantiated and called as such:
 * AllOne obj = new AllOne();
 * obj.inc(key);
 * obj.dec(key);
 * String param_3 = obj.getMaxKey();
 * String param_4 = obj.getMinKey();
 */
