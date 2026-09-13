import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

class DinnerPlates {
    private final int capacity;
    private final List<List<Integer>> stacks;
    // Min-heap of stack indices that MIGHT have room to push into.
    // Entries can go stale (index removed / stack filled up since being
    // added) -- they're just skipped lazily whenever they surface.
    private final PriorityQueue<Integer> available;

    public DinnerPlates(int capacity) {
        this.capacity = capacity;
        this.stacks = new ArrayList<>();
        this.available = new PriorityQueue<>();
    }

    public void push(int val) {
        while (!available.isEmpty()
                && (available.peek() >= stacks.size() || stacks.get(available.peek()).size() >= capacity)) {
            available.poll();
        }

        int index;
        if (available.isEmpty()) {
            index = stacks.size();
            stacks.add(new ArrayList<>());
        } else {
            index = available.peek();
        }

        stacks.get(index).add(val);

        if (stacks.get(index).size() < capacity) {
            available.offer(index);
        }
    }

    public int pop() {
        while (!stacks.isEmpty() && stacks.get(stacks.size() - 1).isEmpty()) {
            stacks.remove(stacks.size() - 1);
        }

        if (stacks.isEmpty()) {
            return -1;
        }

        return popAtStack(stacks.size() - 1);
    }

    public int popAtStack(int index) {
        if (index >= stacks.size() || stacks.get(index).isEmpty()) {
            return -1;
        }

        List<Integer> stack = stacks.get(index);
        int val = stack.remove(stack.size() - 1);
        available.offer(index);
        return val;
    }
}

/**
 * Your DinnerPlates object will be instantiated and called as such:
 * DinnerPlates obj = new DinnerPlates(capacity);
 * obj.push(val);
 * int param_2 = obj.pop();
 * int param_3 = obj.popAtStack(index);
 */
