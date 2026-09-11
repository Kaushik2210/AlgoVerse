import type { CodeSamples } from "./types";
import { RB_CODE } from "@/lib/algorithms/redBlack";

export const RB_CODE_SAMPLES: Record<string, CodeSamples> = {
  insert: {
    js: RB_CODE.insert,
    python: `def insert(tree, value) -> None:
    z = bst_insert(tree, value)  # z starts RED
    fixup(tree, z)

def fixup(tree, z) -> None:
    while z.parent and z.parent.color == "red":
        parent, grandparent = z.parent, z.parent.parent
        if parent is grandparent.left:
            uncle = grandparent.right
            if is_red(uncle):
                parent.color = uncle.color = "black"  # recolor
                grandparent.color = "red"
                z = grandparent  # continue from grandparent
            else:
                if z is parent.right:
                    z = parent
                    rotate_left(tree, z)  # triangle -> line
                z.parent.color = "black"
                z.parent.parent.color = "red"
                rotate_right(tree, z.parent.parent)  # line case
        else:
            pass  # mirror image with left/right swapped
    tree.root.color = "black"`,
    java: `public class Solution {
    public static void insert(Tree tree, int value) {
        Node z = bstInsert(tree, value); // z starts RED
        fixup(tree, z);
    }

    static void fixup(Tree tree, Node z) {
        while (z.parent != null && z.parent.color == Color.RED) {
            Node parent = z.parent, grandparent = parent.parent;
            if (parent == grandparent.left) {
                Node uncle = grandparent.right;
                if (isRed(uncle)) {
                    parent.color = uncle.color = Color.BLACK; // recolor
                    grandparent.color = Color.RED;
                    z = grandparent; // continue from grandparent
                } else {
                    if (z == parent.right) { z = parent; rotateLeft(tree, z); } // triangle -> line
                    z.parent.color = Color.BLACK;
                    z.parent.parent.color = Color.RED;
                    rotateRight(tree, z.parent.parent); // line case
                }
            } else {
                // mirror image with left/right swapped
            }
        }
        tree.root.color = Color.BLACK;
    }
}`,
    cpp: `void fixup(Tree& tree, Node* z) {
    while (z->parent && z->parent->color == Color::Red) {
        Node* parent = z->parent;
        Node* grandparent = parent->parent;
        if (parent == grandparent->left) {
            Node* uncle = grandparent->right;
            if (isRed(uncle)) {
                parent->color = uncle->color = Color::Black; // recolor
                grandparent->color = Color::Red;
                z = grandparent; // continue from grandparent
            } else {
                if (z == parent->right) { z = parent; rotateLeft(tree, z); } // triangle -> line
                z->parent->color = Color::Black;
                z->parent->parent->color = Color::Red;
                rotateRight(tree, z->parent->parent); // line case
            }
        } else {
            // mirror image with left/right swapped
        }
    }
    tree.root->color = Color::Black;
}

void insert(Tree& tree, int value) {
    Node* z = bstInsert(tree, value); // z starts RED
    fixup(tree, z);
}`,
  },
  search: {
    js: RB_CODE.search,
    python: `def search(node, target):
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
