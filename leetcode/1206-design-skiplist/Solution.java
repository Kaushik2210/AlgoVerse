import java.util.Random;

class Skiplist {
    private static final int MAX_LEVEL = 16;
    private static final double P = 0.5;

    private class Node {
        int val;
        Node[] forward;
        Node(int val, int level) {
            this.val = val;
            this.forward = new Node[level + 1];
        }
    }

    private final Node head = new Node(-1, MAX_LEVEL);
    private int level = 0;
    private final Random random = new Random();

    private int randomLevel() {
        int lvl = 0;
        while (random.nextDouble() < P && lvl < MAX_LEVEL) {
            lvl++;
        }
        return lvl;
    }

    @SuppressWarnings("unchecked")
    private Node[] findPredecessors(int target) {
        Node[] update = new Node[MAX_LEVEL + 1];
        Node cur = head;
        for (int i = level; i >= 0; i--) {
            while (cur.forward[i] != null && cur.forward[i].val < target) {
                cur = cur.forward[i];
            }
            update[i] = cur;
        }
        return update;
    }

    public boolean search(int target) {
        Node[] update = findPredecessors(target);
        Node candidate = update[0].forward[0];
        return candidate != null && candidate.val == target;
    }

    public void add(int num) {
        Node[] update = findPredecessors(num);
        int newLevel = randomLevel();
        if (newLevel > level) {
            for (int i = level + 1; i <= newLevel; i++) {
                update[i] = head;
            }
            level = newLevel;
        }
        Node newNode = new Node(num, newLevel);
        for (int i = 0; i <= newLevel; i++) {
            newNode.forward[i] = update[i].forward[i];
            update[i].forward[i] = newNode;
        }
    }

    public boolean erase(int num) {
        Node[] update = findPredecessors(num);
        Node candidate = update[0].forward[0];
        if (candidate == null || candidate.val != num) {
            return false;
        }
        for (int i = 0; i <= level; i++) {
            if (update[i].forward[i] != candidate) break;
            update[i].forward[i] = candidate.forward[i];
        }
        while (level > 0 && head.forward[level] == null) {
            level--;
        }
        return true;
    }
}

/**
 * Your Skiplist object will be instantiated and called as such:
 * Skiplist obj = new Skiplist();
 * boolean param_1 = obj.search(target);
 * obj.add(num);
 * boolean param_3 = obj.erase(num);
 */
