/*
// Definition for a Node.
class Node {
    int val;
    Node next;
    Node random;

    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}
*/

import java.util.HashMap;
import java.util.Map;

class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;

        Map<Node, Node> clones = new HashMap<>();

        Node node = head;
        while (node != null) {
            clones.put(node, new Node(node.val));
            node = node.next;
        }

        node = head;
        while (node != null) {
            clones.get(node).next = clones.get(node.next);
            clones.get(node).random = clones.get(node.random);
            node = node.next;
        }

        return clones.get(head);
    }
}
