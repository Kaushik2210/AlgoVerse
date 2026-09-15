import type { CodeSamples } from "./types";
import { PATTERN_CODE } from "@/lib/algorithms/patterns";

export const PATTERN_CODE_SAMPLES: Record<string, CodeSamples> = {
  twoPointers: {
    js: PATTERN_CODE.twoPointers,
    python: `def max_area(heights: list[int]) -> int:
    left, right = 0, len(heights) - 1
    best = 0
    while left < right:
        area = (right - left) * min(heights[left], heights[right])
        if heights[left] < heights[right]:
            left += 1
        else:
            right -= 1
        best = max(best, area)
    return best`,
    java: `public class Solution {
    public static int maxArea(int[] heights) {
        int left = 0, right = heights.length - 1;
        int best = 0;
        while (left < right) {
            int area = (right - left) * Math.min(heights[left], heights[right]);
            if (heights[left] < heights[right]) left++;
            else right--;
            best = Math.max(best, area);
        }
        return best;
    }
}`,
    cpp: `int maxArea(vector<int>& heights) {
    int left = 0, right = (int)heights.size() - 1;
    int best = 0;
    while (left < right) {
        int area = (right - left) * min(heights[left], heights[right]);
        if (heights[left] < heights[right]) left++;
        else right--;
        best = max(best, area);
    }
    return best;
}`,
  },
  slidingWindow: {
    js: PATTERN_CODE.slidingWindow,
    python: `def max_sum_subarray(arr: list[int], k: int) -> int:
    window_sum = sum(arr[:k])
    best = window_sum
    for end in range(k, len(arr)):
        window_sum += arr[end] - arr[end - k]
        best = max(best, window_sum)
    return best`,
    java: `public class Solution {
    public static int maxSumSubarray(int[] arr, int k) {
        int sum = 0;
        for (int i = 0; i < k; i++) sum += arr[i];
        int best = sum;
        for (int end = k; end < arr.length; end++) {
            sum += arr[end] - arr[end - k];
            best = Math.max(best, sum);
        }
        return best;
    }
}`,
    cpp: `int maxSumSubarray(vector<int>& arr, int k) {
    int sum = 0;
    for (int i = 0; i < k; i++) sum += arr[i];
    int best = sum;
    for (int end = k; end < (int)arr.size(); end++) {
        sum += arr[end] - arr[end - k];
        best = max(best, sum);
    }
    return best;
}`,
  },
  treeBfs: {
    js: PATTERN_CODE.treeBfs,
    python: `from collections import deque

def level_order(root) -> list:
    result = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        result.append(node.value)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return result`,
    java: `public class Solution {
    public static List<Integer> levelOrder(Node root) {
        List<Integer> result = new ArrayList<>();
        Queue<Node> queue = new LinkedList<>(List.of(root));
        while (!queue.isEmpty()) {
            Node node = queue.poll();
            result.add(node.value);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        return result;
    }
}`,
    cpp: `vector<int> levelOrder(Node* root) {
    vector<int> result;
    queue<Node*> q;
    q.push(root);
    while (!q.empty()) {
        Node* node = q.front(); q.pop();
        result.push_back(node->value);
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
    return result;
}`,
  },
  fastSlowMiddle: {
    js: PATTERN_CODE.fastSlowMiddle,
    python: `def middle_node(head):
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # the middle node`,
    java: `public class Solution {
    public static Node middleNode(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow; // the middle node
    }
}`,
    cpp: `Node* middleNode(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow; // the middle node
}`,
  },
  fastSlowCycle: {
    js: PATTERN_CODE.fastSlowCycle,
    python: `def has_cycle(head) -> bool:
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True  # pointers met — cycle!
    return False  # fast reached the end — no cycle`,
    java: `public class Solution {
    public static boolean hasCycle(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true; // pointers met — cycle!
        }
        return false; // fast reached the end — no cycle
    }
}`,
    cpp: `bool hasCycle(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true; // pointers met — cycle!
    }
    return false; // fast reached the end — no cycle
}`,
  },
  monotonicStack: {
    js: PATTERN_CODE.monotonicStack,
    python: `def next_greater_elements(arr: list[int]) -> list[int]:
    result = [-1] * len(arr)
    stack = []  # holds indices, values kept increasing bottom to top

    for i, value in enumerate(arr):
        while stack and arr[stack[-1]] < value:
            idx = stack.pop()
            result[idx] = value
        stack.append(i)
    return result`,
    java: `public class Solution {
    public static int[] nextGreaterElements(int[] arr) {
        int[] result = new int[arr.length];
        Arrays.fill(result, -1);
        Deque<Integer> stack = new ArrayDeque<>(); // holds indices, values kept increasing bottom to top

        for (int i = 0; i < arr.length; i++) {
            while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
                int idx = stack.pop();
                result[idx] = arr[i];
            }
            stack.push(i);
        }
        return result;
    }
}`,
    cpp: `vector<int> nextGreaterElements(vector<int>& arr) {
    vector<int> result(arr.size(), -1);
    vector<int> stack; // holds indices, values kept increasing bottom to top

    for (int i = 0; i < (int)arr.size(); i++) {
        while (!stack.empty() && arr[stack.back()] < arr[i]) {
            int idx = stack.back(); stack.pop_back();
            result[idx] = arr[i];
        }
        stack.push_back(i);
    }
    return result;
}`,
  },
  mergeIntervals: {
    js: PATTERN_CODE.mergeIntervals,
    python: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda pair: pair[0])
    result = [intervals[0]]

    for start, end in intervals[1:]:
        current = result[-1]
        if start <= current[1]:
            current[1] = max(current[1], end)
        else:
            result.append([start, end])
    return result`,
    java: `public class Solution {
    public static List<int[]> mergeIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        List<int[]> result = new ArrayList<>();
        result.add(intervals[0]);

        for (int i = 1; i < intervals.length; i++) {
            int[] current = result.get(result.size() - 1);
            int[] next = intervals[i];
            if (next[0] <= current[1]) {
                current[1] = Math.max(current[1], next[1]);
            } else {
                result.add(next);
            }
        }
        return result;
    }
}`,
    cpp: `vector<vector<int>> mergeIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> result = {intervals[0]};

    for (size_t i = 1; i < intervals.size(); i++) {
        auto& current = result.back();
        auto& next = intervals[i];
        if (next[0] <= current[1]) {
            current[1] = max(current[1], next[1]);
        } else {
            result.push_back(next);
        }
    }
    return result;
}`,
  },
  modifiedBinarySearch: {
    js: PATTERN_CODE.modifiedBinarySearch,
    python: `def search(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid

        if nums[lo] <= nums[mid]:
            # left half [lo..mid] is sorted
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:
            # right half (mid..hi] is sorted
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1`,
    java: `public class Solution {
    public static int search(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] == target) return mid;

            if (nums[lo] <= nums[mid]) {
                // left half [lo..mid] is sorted
                if (nums[lo] <= target && target < nums[mid]) {
                    hi = mid - 1;
                } else {
                    lo = mid + 1;
                }
            } else {
                // right half (mid..hi] is sorted
                if (nums[mid] < target && target <= nums[hi]) {
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
        }
        return -1;
    }
}`,
    cpp: `int search(vector<int>& nums, int target) {
    int lo = 0, hi = (int)nums.size() - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (nums[mid] == target) return mid;

        if (nums[lo] <= nums[mid]) {
            // left half [lo..mid] is sorted
            if (nums[lo] <= target && target < nums[mid]) {
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        } else {
            // right half (mid..hi] is sorted
            if (nums[mid] < target && target <= nums[hi]) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
    }
    return -1;
}`,
  },
  topK: {
    js: PATTERN_CODE.topK,
    python: `import heapq

def top_k_largest(stream, k: int) -> list:
    min_heap = []  # size-k min-heap

    for value in stream:
        if len(min_heap) < k:
            heapq.heappush(min_heap, value)
        elif value > min_heap[0]:
            heapq.heapreplace(min_heap, value)
        # else: value can't be in the top k, discard
    return min_heap  # the k largest values, in heap order`,
    java: `public class Solution {
    public static PriorityQueue<Integer> topKLargest(int[] stream, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(); // size-k min-heap

        for (int value : stream) {
            if (minHeap.size() < k) {
                minHeap.offer(value);
            } else if (value > minHeap.peek()) {
                minHeap.poll();
                minHeap.offer(value);
            }
            // else: value can't be in the top k, discard
        }
        return minHeap; // the k largest values, in heap order
    }
}`,
    cpp: `#include <queue>
using namespace std;

priority_queue<int, vector<int>, greater<int>> topKLargest(vector<int>& stream, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap; // size-k min-heap

    for (int value : stream) {
        if ((int)minHeap.size() < k) {
            minHeap.push(value);
        } else if (value > minHeap.top()) {
            minHeap.pop();
            minHeap.push(value);
        }
        // else: value can't be in the top k, discard
    }
    return minHeap; // the k largest values, in heap order
}`,
  },
  cyclicSort: {
    js: PATTERN_CODE.cyclicSort,
    python: `def cyclic_sort(nums: list[int]) -> list[int]:
    i = 0
    while i < len(nums):
        correct = nums[i] - 1
        if nums[i] != nums[correct]:
            nums[i], nums[correct] = nums[correct], nums[i]
        else:
            i += 1
    return nums`,
    java: `public class Solution {
    public static int[] cyclicSort(int[] nums) {
        int i = 0;
        while (i < nums.length) {
            int correct = nums[i] - 1;
            if (nums[i] != nums[correct]) {
                int tmp = nums[i];
                nums[i] = nums[correct];
                nums[correct] = tmp;
            } else {
                i++;
            }
        }
        return nums;
    }
}`,
    cpp: `vector<int> cyclicSort(vector<int>& nums) {
    int i = 0;
    while (i < (int)nums.size()) {
        int correct = nums[i] - 1;
        if (nums[i] != nums[correct]) {
            swap(nums[i], nums[correct]);
        } else {
            i++;
        }
    }
    return nums;
}`,
  },
  bitManipulation: {
    js: PATTERN_CODE.bitManipulation,
    python: `def single_number(nums: list[int]) -> int:
    result = 0
    for n in nums:
        result ^= n  # duplicates cancel: x ^ x == 0
    return result`,
    java: `public class Solution {
    public static int singleNumber(int[] nums) {
        int result = 0;
        for (int n : nums) {
            result ^= n; // duplicates cancel: x ^ x == 0
        }
        return result;
    }
}`,
    cpp: `int singleNumber(vector<int>& nums) {
    int result = 0;
    for (int n : nums) {
        result ^= n; // duplicates cancel: x ^ x == 0
    }
    return result;
}`,
  },
  twoHeaps: {
    js: PATTERN_CODE.twoHeaps,
    python: `import heapq

class MedianFinder:
    def __init__(self):
        self.lower = []  # max-heap, stored negated
        self.upper = []  # min-heap

    def add_num(self, num: int) -> None:
        if not self.lower or num <= -self.lower[0]:
            heapq.heappush(self.lower, -num)
        else:
            heapq.heappush(self.upper, num)

        if len(self.lower) > len(self.upper) + 1:
            heapq.heappush(self.upper, -heapq.heappop(self.lower))
        elif len(self.upper) > len(self.lower):
            heapq.heappush(self.lower, -heapq.heappop(self.upper))

    def find_median(self) -> float:
        if len(self.lower) == len(self.upper):
            return (-self.lower[0] + self.upper[0]) / 2
        return -self.lower[0]`,
    java: `public class MedianFinder {
    private final PriorityQueue<Integer> lower = new PriorityQueue<>(Collections.reverseOrder()); // max-heap
    private final PriorityQueue<Integer> upper = new PriorityQueue<>(); // min-heap

    public void addNum(int num) {
        if (lower.isEmpty() || num <= lower.peek()) {
            lower.offer(num);
        } else {
            upper.offer(num);
        }

        if (lower.size() > upper.size() + 1) {
            upper.offer(lower.poll());
        } else if (upper.size() > lower.size()) {
            lower.offer(upper.poll());
        }
    }

    public double findMedian() {
        if (lower.size() == upper.size()) {
            return (lower.peek() + upper.peek()) / 2.0;
        }
        return lower.peek();
    }
}`,
    cpp: `class MedianFinder {
    priority_queue<int> lower;                              // max-heap
    priority_queue<int, vector<int>, greater<int>> upper;    // min-heap
public:
    void addNum(int num) {
        if (lower.empty() || num <= lower.top()) lower.push(num);
        else upper.push(num);

        if ((int)lower.size() > (int)upper.size() + 1) {
            upper.push(lower.top());
            lower.pop();
        } else if (upper.size() > lower.size()) {
            lower.push(upper.top());
            upper.pop();
        }
    }

    double findMedian() {
        if (lower.size() == upper.size()) {
            return (lower.top() + upper.top()) / 2.0;
        }
        return lower.top();
    }
};`,
  },
  kWayMerge: {
    js: PATTERN_CODE.kWayMerge,
    python: `import heapq

def merge_k_lists(lists: list[list[int]]) -> list[int]:
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))

    merged = []
    while heap:
        value, list_idx, elem_idx = heapq.heappop(heap)
        merged.append(value)
        next_idx = elem_idx + 1
        if next_idx < len(lists[list_idx]):
            heapq.heappush(heap, (lists[list_idx][next_idx], list_idx, next_idx))
    return merged`,
    java: `public class Solution {
    public static List<Integer> mergeKLists(List<List<Integer>> lists) {
        // {value, listIndex, elemIndex}
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        for (int i = 0; i < lists.size(); i++) {
            if (!lists.get(i).isEmpty()) heap.offer(new int[]{lists.get(i).get(0), i, 0});
        }

        List<Integer> merged = new ArrayList<>();
        while (!heap.isEmpty()) {
            int[] top = heap.poll();
            merged.add(top[0]);
            int nextIdx = top[2] + 1;
            if (nextIdx < lists.get(top[1]).size()) {
                heap.offer(new int[]{lists.get(top[1]).get(nextIdx), top[1], nextIdx});
            }
        }
        return merged;
    }
}`,
    cpp: `vector<int> mergeKLists(vector<vector<int>>& lists) {
    // {value, listIndex, elemIndex}
    using T = tuple<int, int, int>;
    priority_queue<T, vector<T>, greater<T>> heap;
    for (int i = 0; i < (int)lists.size(); i++) {
        if (!lists[i].empty()) heap.push({lists[i][0], i, 0});
    }

    vector<int> merged;
    while (!heap.empty()) {
        auto [value, listIdx, elemIdx] = heap.top();
        heap.pop();
        merged.push_back(value);
        int nextIdx = elemIdx + 1;
        if (nextIdx < (int)lists[listIdx].size()) {
            heap.push({lists[listIdx][nextIdx], listIdx, nextIdx});
        }
    }
    return merged;
}`,
  },
};
