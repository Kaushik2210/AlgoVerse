import type { CodeSamples } from "./types";
import { LINKED_LIST_CODE } from "@/lib/algorithms/linkedList";

export const LINKED_LIST_CODE_SAMPLES: Record<string, CodeSamples> = {
  search: {
    js: LINKED_LIST_CODE.search,
    python: `class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next

def search(head: Node | None, target) -> Node | None:
    curr = head
    while curr:
        if curr.value == target:
            return curr
        curr = curr.next
    return None`,
    java: `class Node {
    int value;
    Node next;
    Node(int value) { this.value = value; }
}

public class Solution {
    public static Node search(Node head, int target) {
        Node curr = head;
        while (curr != null) {
            if (curr.value == target) return curr;
            curr = curr.next;
        }
        return null;
    }
}`,
    cpp: `struct Node {
    int value;
    Node* next;
    Node(int v) : value(v), next(nullptr) {}
};

Node* search(Node* head, int target) {
    Node* curr = head;
    while (curr) {
        if (curr->value == target) return curr;
        curr = curr->next;
    }
    return nullptr;
}`,
  },
  insert: {
    js: LINKED_LIST_CODE.insert,
    python: `def insert_at_end(head: Node | None, value) -> Node:
    node = Node(value)
    if not head:
        return node
    curr = head
    while curr.next:
        curr = curr.next
    curr.next = node
    return head`,
    java: `public class Solution {
    public static Node insertAtEnd(Node head, int value) {
        Node node = new Node(value);
        if (head == null) return node;
        Node curr = head;
        while (curr.next != null) curr = curr.next;
        curr.next = node;
        return head;
    }
}`,
    cpp: `Node* insertAtEnd(Node* head, int value) {
    Node* node = new Node(value);
    if (!head) return node;
    Node* curr = head;
    while (curr->next) curr = curr->next;
    curr->next = node;
    return head;
}`,
  },
  delete: {
    js: LINKED_LIST_CODE.delete,
    python: `def delete_value(head: Node | None, target) -> Node | None:
    if not head:
        return None
    if head.value == target:
        return head.next
    curr = head
    while curr.next and curr.next.value != target:
        curr = curr.next
    if curr.next:
        curr.next = curr.next.next
    return head`,
    java: `public class Solution {
    public static Node deleteValue(Node head, int target) {
        if (head == null) return null;
        if (head.value == target) return head.next;
        Node curr = head;
        while (curr.next != null && curr.next.value != target) {
            curr = curr.next;
        }
        if (curr.next != null) curr.next = curr.next.next;
        return head;
    }
}`,
    cpp: `Node* deleteValue(Node* head, int target) {
    if (!head) return nullptr;
    if (head->value == target) return head->next;
    Node* curr = head;
    while (curr->next && curr->next->value != target) {
        curr = curr->next;
    }
    if (curr->next) curr->next = curr->next->next;
    return head;
}`,
  },
  reverse: {
    js: LINKED_LIST_CODE.reverse,
    python: `def reverse(head: Node | None) -> Node | None:
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev`,
    java: `public class Solution {
    public static Node reverse(Node head) {
        Node prev = null;
        Node curr = head;
        while (curr != null) {
            Node next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,
    cpp: `Node* reverse(Node* head) {
    Node* prev = nullptr;
    Node* curr = head;
    while (curr) {
        Node* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
  },
};
