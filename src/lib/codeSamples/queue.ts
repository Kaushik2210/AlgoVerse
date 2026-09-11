import type { CodeSamples } from "./types";
import { QUEUE_CODE } from "@/lib/algorithms/queue";

export const QUEUE_CODE_SAMPLES: Record<string, CodeSamples> = {
  simple: {
    js: QUEUE_CODE.simple,
    python: `from collections import deque

def enqueue(queue: deque, value) -> None:
    queue.append(value)  # add at the rear

def dequeue(queue: deque):
    return queue.popleft()  # remove from the front — FIFO`,
    java: `import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static void enqueue(Deque<Integer> queue, int value) {
        queue.addLast(value); // add at the rear
    }

    public static int dequeue(Deque<Integer> queue) {
        return queue.removeFirst(); // remove from the front — FIFO
    }
}`,
    cpp: `#include <queue>
using namespace std;

void enqueue(queue<int>& q, int value) {
    q.push(value); // add at the rear
}

int dequeue(queue<int>& q) {
    int value = q.front();
    q.pop(); // remove from the front — FIFO
    return value;
}`,
  },
  circular: {
    js: QUEUE_CODE.circular,
    python: `class CircularQueue:
    def __init__(self, capacity: int):
        self.buffer = [None] * capacity
        self.capacity = capacity
        self.front = 0
        self.rear = -1
        self.size = 0

    def enqueue(self, value) -> None:
        if self.size == self.capacity:
            raise OverflowError("full")
        self.rear = (self.rear + 1) % self.capacity  # wraps to 0 past the end
        self.buffer[self.rear] = value
        self.size += 1

    def dequeue(self):
        if self.size == 0:
            raise IndexError("empty")
        value = self.buffer[self.front]
        self.buffer[self.front] = None
        self.front = (self.front + 1) % self.capacity  # wraps too
        self.size -= 1
        return value`,
    java: `public class CircularQueue {
    private final Integer[] buffer;
    private final int capacity;
    private int front = 0;
    private int rear = -1;
    private int size = 0;

    public CircularQueue(int capacity) {
        this.capacity = capacity;
        this.buffer = new Integer[capacity];
    }

    public void enqueue(int value) {
        if (size == capacity) throw new IllegalStateException("full");
        rear = (rear + 1) % capacity; // wraps to 0 past the end
        buffer[rear] = value;
        size++;
    }

    public int dequeue() {
        if (size == 0) throw new IllegalStateException("empty");
        int value = buffer[front];
        buffer[front] = null;
        front = (front + 1) % capacity; // wraps too
        size--;
        return value;
    }
}`,
    cpp: `#include <vector>
#include <optional>
#include <stdexcept>
using namespace std;

class CircularQueue {
    vector<optional<int>> buffer;
    int capacity, front = 0, rear = -1, size = 0;

public:
    explicit CircularQueue(int cap) : buffer(cap), capacity(cap) {}

    void enqueue(int value) {
        if (size == capacity) throw runtime_error("full");
        rear = (rear + 1) % capacity; // wraps to 0 past the end
        buffer[rear] = value;
        size++;
    }

    int dequeue() {
        if (size == 0) throw runtime_error("empty");
        int value = *buffer[front];
        buffer[front] = nullopt;
        front = (front + 1) % capacity; // wraps too
        size--;
        return value;
    }
};`,
  },
};
