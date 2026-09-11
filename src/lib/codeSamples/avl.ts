import type { CodeSamples } from "./types";
import { AVL_CODE } from "@/lib/algorithms/avl";

export const AVL_CODE_SAMPLES: Record<string, CodeSamples> = {
  insert: {
    js: AVL_CODE.insert,
    python: `def insert(node: "Node | None", value) -> "Node":
    if not node:
        return make_node(value)
    if value < node.value:
        node.left = insert(node.left, value)
    elif value > node.value:
        node.right = insert(node.right, value)
    else:
        return node

    update_height(node)
    bf = balance_factor(node)  # height(left) - height(right)

    if bf > 1 and value < node.left.value:
        return rotate_right(node)  # LL
    if bf > 1:
        node.left = rotate_left(node.left)
        return rotate_right(node)  # LR
    if bf < -1 and value > node.right.value:
        return rotate_left(node)  # RR
    if bf < -1:
        node.right = rotate_right(node.right)
        return rotate_left(node)  # RL
    return node`,
    java: `public class Solution {
    public static Node insert(Node node, int value) {
        if (node == null) return makeNode(value);
        if (value < node.value) node.left = insert(node.left, value);
        else if (value > node.value) node.right = insert(node.right, value);
        else return node;

        updateHeight(node);
        int bf = balanceFactor(node); // height(left) - height(right)

        if (bf > 1 && value < node.left.value) return rotateRight(node);        // LL
        if (bf > 1) { node.left = rotateLeft(node.left); return rotateRight(node); } // LR
        if (bf < -1 && value > node.right.value) return rotateLeft(node);       // RR
        if (bf < -1) { node.right = rotateRight(node.right); return rotateLeft(node); } // RL
        return node;
    }
}`,
    cpp: `Node* insert(Node* node, int value) {
    if (!node) return makeNode(value);
    if (value < node->value) node->left = insert(node->left, value);
    else if (value > node->value) node->right = insert(node->right, value);
    else return node;

    updateHeight(node);
    int bf = balanceFactor(node); // height(left) - height(right)

    if (bf > 1 && value < node->left->value) return rotateRight(node);        // LL
    if (bf > 1) { node->left = rotateLeft(node->left); return rotateRight(node); } // LR
    if (bf < -1 && value > node->right->value) return rotateLeft(node);       // RR
    if (bf < -1) { node->right = rotateRight(node->right); return rotateLeft(node); } // RL
    return node;
}`,
  },
  search: {
    js: AVL_CODE.search,
    python: `def search(node: "Node | None", target):
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
};
