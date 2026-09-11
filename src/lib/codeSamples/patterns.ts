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
};
