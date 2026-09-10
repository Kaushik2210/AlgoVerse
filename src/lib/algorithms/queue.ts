import type { StepSequence } from "./types";

export interface QueueVizState {
  /** fixed-size circular buffer slots; null = empty slot */
  buffer: (number | null)[];
  front: number;
  rear: number;
  size: number;
  capacity: number;
  /** slot index being written to or read from this step */
  highlight?: number;
  /** true when this step's write/read wrapped past the end of the buffer */
  wrapped?: boolean;
}

function snap(state: QueueVizState): QueueVizState {
  return { ...state, buffer: [...state.buffer] };
}

// ---------------------------------------------------------------------------
// Simple (unbounded) queue — no wraparound, front/rear just walk forward
// ---------------------------------------------------------------------------
export function simpleQueueSteps(values: number[]): StepSequence<QueueVizState> {
  const capacity = Math.max(values.length + 2, 4);
  const buffer: (number | null)[] = Array(capacity).fill(null);
  const steps: StepSequence<QueueVizState> = [];
  let rear = -1;
  let front = 0;
  let size = 0;

  steps.push({
    state: snap({ buffer, front: 0, rear: -1, size: 0, capacity }),
    narration: `Empty queue. Enqueueing ${values.length} value(s) in order, then dequeueing half.`,
    highlightedLine: 1,
    stats: { size: 0 },
  });

  for (const v of values) {
    rear++;
    buffer[rear] = v;
    size++;
    steps.push({
      state: snap({ buffer, front, rear, size, capacity, highlight: rear }),
      narration: `Enqueue ${v} at the rear (index ${rear}).`,
      highlightedLine: 2,
      stats: { size, front, rear },
    });
  }

  const dequeueCount = Math.floor(values.length / 2);
  for (let i = 0; i < dequeueCount; i++) {
    const dequeued = buffer[front];
    steps.push({
      state: snap({ buffer, front, rear, size, capacity, highlight: front }),
      narration: `Dequeue from the front (index ${front}): ${dequeued}. FIFO — first in, first out.`,
      highlightedLine: 4,
      stats: { size, front, rear },
    });
    buffer[front] = null;
    front++;
    size--;
  }

  steps.push({
    state: snap({ buffer, front, rear, size, capacity }),
    narration: `Done. Front is at index ${front}, rear at index ${rear}, ${size} item(s) remain.`,
    highlightedLine: 4,
    stats: { size, front, rear },
  });

  return steps;
}

// ---------------------------------------------------------------------------
// Circular queue — fixed capacity, front/rear wrap with modulo arithmetic.
// Demo script: fill to near capacity, dequeue a couple to free room at the
// front, then keep enqueueing so the rear pointer wraps past the end of the
// buffer back to index 0.
// ---------------------------------------------------------------------------
export function circularQueueSteps(capacity: number, values: number[]): StepSequence<QueueVizState> {
  const buffer: (number | null)[] = Array(capacity).fill(null);
  const steps: StepSequence<QueueVizState> = [];
  let front = 0;
  let rear = -1;
  let size = 0;

  steps.push({
    state: snap({ buffer, front, rear, size, capacity }),
    narration: `Circular buffer of capacity ${capacity}. front and rear both start unset.`,
    highlightedLine: 1,
    stats: { size, front, capacity },
  });

  const fillTarget = Math.min(values.length, capacity - 1, Math.max(capacity - 2, 1));
  let vi = 0;

  function enqueue(v: number) {
    if (size === capacity) {
      steps.push({
        state: snap({ buffer, front, rear, size, capacity }),
        narration: `Queue is full (size === capacity) — enqueue(${v}) rejected.`,
        highlightedLine: 3,
        stats: { size, front, rear },
      });
      return;
    }
    const nextRear = (rear + 1) % capacity;
    const wrapped = rear !== -1 && nextRear < rear;
    rear = nextRear;
    buffer[rear] = v;
    size++;
    steps.push({
      state: snap({ buffer, front, rear, size, capacity, highlight: rear, wrapped }),
      narration: wrapped
        ? `Enqueue ${v}: rear wraps around past the end — (rear + 1) % ${capacity} = ${rear}.`
        : `Enqueue ${v} at rear = ${rear}.`,
      highlightedLine: 4,
      stats: { size, front, rear },
    });
  }

  function dequeue() {
    if (size === 0) return;
    const v = buffer[front];
    steps.push({
      state: snap({ buffer, front, rear, size, capacity, highlight: front }),
      narration: `Dequeue from front = ${front}: ${v}.`,
      highlightedLine: 7,
      stats: { size, front, rear },
    });
    buffer[front] = null;
    const nextFront = (front + 1) % capacity;
    const wrapped = nextFront < front;
    front = nextFront;
    size--;
    if (wrapped) {
      steps.push({
        state: snap({ buffer, front, rear, size, capacity, wrapped: true }),
        narration: `front wraps around — (front + 1) % ${capacity} = ${front}.`,
        highlightedLine: 8,
        stats: { size, front, rear },
      });
    }
  }

  // Fill toward the front of capacity
  for (; vi < fillTarget; vi++) enqueue(values[vi % values.length]);

  // Free up two slots at the front so the next enqueues have to wrap
  dequeue();
  if (capacity > 2) dequeue();

  // Keep enqueueing remaining (or repeated) values to force the wraparound
  const remaining = Math.max(values.length - fillTarget, 2);
  for (let k = 0; k < remaining; k++, vi++) enqueue(values[vi % values.length]);

  steps.push({
    state: snap({ buffer, front, rear, size, capacity }),
    narration: `Final state: front = ${front}, rear = ${rear}, ${size}/${capacity} slots filled.`,
    highlightedLine: 4,
    stats: { size, front, rear },
  });

  return steps;
}

export const QUEUE_CODE: Record<string, string> = {
  simple: `function enqueue(queue, value) {
  queue.push(value); // add at the rear
}
function dequeue(queue) {
  return queue.shift(); // remove from the front — FIFO
}`,
  circular: `class CircularQueue {
  constructor(capacity) {
    this.buffer = new Array(capacity).fill(null);
    this.capacity = capacity;
    this.front = 0;
    this.rear = -1;
    this.size = 0;
  }
  enqueue(value) {
    if (this.size === this.capacity) throw new Error("full");
    this.rear = (this.rear + 1) % this.capacity; // wraps to 0 past the end
    this.buffer[this.rear] = value;
    this.size++;
  }
  dequeue() {
    if (this.size === 0) throw new Error("empty");
    const value = this.buffer[this.front];
    this.buffer[this.front] = null;
    this.front = (this.front + 1) % this.capacity; // wraps too
    this.size--;
    return value;
  }
}`,
};
