import java.util.ArrayDeque;
import java.util.Deque;

class BoundedBlockingQueue {
    private final int capacity;
    private final Deque<Integer> queue = new ArrayDeque<>();
    private final Object lock = new Object();

    public BoundedBlockingQueue(int capacity) {
        this.capacity = capacity;
    }

    public void enqueue(int element) throws InterruptedException {
        synchronized (lock) {
            while (queue.size() == capacity) {
                lock.wait();
            }
            queue.addLast(element);
            lock.notifyAll();
        }
    }

    public int dequeue() throws InterruptedException {
        synchronized (lock) {
            while (queue.isEmpty()) {
                lock.wait();
            }
            int val = queue.removeFirst();
            lock.notifyAll();
            return val;
        }
    }

    public int size() {
        synchronized (lock) {
            return queue.size();
        }
    }
}
