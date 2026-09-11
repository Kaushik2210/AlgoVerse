import type { CodeSamples } from "./types";
import { BST_CODE } from "@/lib/algorithms/bst";

export const BST_CODE_SAMPLES: Record<string, CodeSamples> = {
  insert: {
    js: BST_CODE.insert,
    python: `class Node:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

def insert(node: Node | None, value) -> Node:
    if not node:
        return Node(value)
    if value < node.value:
        node.left = insert(node.left, value)
    elif value > node.value:
        node.right = insert(node.right, value)
    return node`,
    java: `class Node {
    int value;
    Node left, right;
    Node(int value) { this.value = value; }
}

public class Solution {
    public static Node insert(Node node, int value) {
        if (node == null) return new Node(value);
        if (value < node.value) node.left = insert(node.left, value);
        else if (value > node.value) node.right = insert(node.right, value);
        return node;
    }
}`,
    cpp: `struct Node {
    int value;
    Node *left, *right;
    Node(int v) : value(v), left(nullptr), right(nullptr) {}
};

Node* insert(Node* node, int value) {
    if (!node) return new Node(value);
    if (value < node->value) node->left = insert(node->left, value);
    else if (value > node->value) node->right = insert(node->right, value);
    return node;
}`,
  },
  search: {
    js: BST_CODE.search,
    python: `def search(node: Node | None, target):
    if not node:
        return None
    if target == node.value:
        return node
    return search(node.left, target) if target < node.value else search(node.right, target)`,
    java: `public class Solution {
    public static Node search(Node node, int target) {
        if (node == null) return null;
        if (target == node.value) return node;
        return target < node.value ? search(node.left, target) : search(node.right, target);
    }
}`,
    cpp: `Node* search(Node* node, int target) {
    if (!node) return nullptr;
    if (target == node->value) return node;
    return target < node->value ? search(node->left, target) : search(node->right, target);
}`,
  },
  delete: {
    js: BST_CODE.delete,
    python: `def min_value_node(node: Node) -> Node:
    curr = node
    while curr.left:
        curr = curr.left
    return curr

def remove(node: Node | None, value) -> Node | None:
    if not node:
        return None
    if value < node.value:
        node.left = remove(node.left, value)
    elif value > node.value:
        node.right = remove(node.right, value)
    else:
        if not node.left:
            return node.right
        if not node.right:
            return node.left
        succ = min_value_node(node.right)
        node.value = succ.value
        node.right = remove(node.right, succ.value)
    return node`,
    java: `public class Solution {
    static Node minValueNode(Node node) {
        Node curr = node;
        while (curr.left != null) curr = curr.left;
        return curr;
    }

    public static Node remove(Node node, int value) {
        if (node == null) return null;
        if (value < node.value) node.left = remove(node.left, value);
        else if (value > node.value) node.right = remove(node.right, value);
        else {
            if (node.left == null) return node.right;
            if (node.right == null) return node.left;
            Node succ = minValueNode(node.right);
            node.value = succ.value;
            node.right = remove(node.right, succ.value);
        }
        return node;
    }
}`,
    cpp: `Node* minValueNode(Node* node) {
    Node* curr = node;
    while (curr->left) curr = curr->left;
    return curr;
}

Node* remove(Node* node, int value) {
    if (!node) return nullptr;
    if (value < node->value) node->left = remove(node->left, value);
    else if (value > node->value) node->right = remove(node->right, value);
    else {
        if (!node->left) return node->right;
        if (!node->right) return node->left;
        Node* succ = minValueNode(node->right);
        node->value = succ->value;
        node->right = remove(node->right, succ->value);
    }
    return node;
}`,
  },
  inorder: {
    js: BST_CODE.inorder,
    python: `def inorder(node: Node | None, out: list | None = None) -> list:
    if out is None:
        out = []
    if not node:
        return out
    inorder(node.left, out)
    out.append(node.value)
    inorder(node.right, out)
    return out`,
    java: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> inorder(Node node, List<Integer> out) {
        if (node == null) return out;
        inorder(node.left, out);
        out.add(node.value);
        inorder(node.right, out);
        return out;
    }
}`,
    cpp: `#include <vector>
using namespace std;

vector<int> inorder(Node* node, vector<int>& out) {
    if (!node) return out;
    inorder(node->left, out);
    out.push_back(node->value);
    inorder(node->right, out);
    return out;
}`,
  },
};
