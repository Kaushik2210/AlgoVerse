class MyCircularDeque {
    private final int[] data;
    private final int capacity;
    private int front;
    private int size;

    public MyCircularDeque(int k) {
        capacity = k;
        data = new int[k];
        front = 0;
        size = 0;
    }

    public boolean insertFront(int value) {
        if (isFull()) return false;
        front = (front - 1 + capacity) % capacity;
        data[front] = value;
        size++;
        return true;
    }

    public boolean insertLast(int value) {
        if (isFull()) return false;
        int idx = (front + size) % capacity;
        data[idx] = value;
        size++;
        return true;
    }

    public boolean deleteFront() {
        if (isEmpty()) return false;
        front = (front + 1) % capacity;
        size--;
        return true;
    }

    public boolean deleteLast() {
        if (isEmpty()) return false;
        size--;
        return true;
    }

    public int getFront() {
        if (isEmpty()) return -1;
        return data[front];
    }

    public int getRear() {
        if (isEmpty()) return -1;
        int idx = (front + size - 1) % capacity;
        return data[idx];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == capacity;
    }
}

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * MyCircularDeque obj = new MyCircularDeque(k);
 * boolean param_1 = obj.insertFront(value);
 * boolean param_2 = obj.insertLast(value);
 * boolean param_3 = obj.deleteFront();
 * boolean param_4 = obj.deleteLast();
 * int param_5 = obj.getFront();
 * int param_6 = obj.getRear();
 * boolean param_7 = obj.isEmpty();
 * boolean param_8 = obj.isFull();
 */
