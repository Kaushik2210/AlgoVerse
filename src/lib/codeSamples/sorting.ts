import type { CodeSamples } from "./types";
import {
  BUBBLE_SORT_CODE,
  INSERTION_SORT_CODE,
  SELECTION_SORT_CODE,
  MERGE_SORT_CODE,
  QUICK_SORT_CODE,
  HEAP_SORT_CODE,
  type SortAlgo,
} from "@/lib/algorithms/sorting";

export const SORT_CODE_SAMPLES: Record<SortAlgo, CodeSamples> = {
  bubble: {
    js: BUBBLE_SORT_CODE,
    python: `def bubble_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
    java: `public class Solution {
    public static int[] bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
        return arr;
    }
}`,
    cpp: `vector<int> bubbleSort(vector<int> arr) {
    int n = (int)arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}`,
  },
  insertion: {
    js: INSERTION_SORT_CODE,
    python: `def insertion_sort(arr: list[int]) -> list[int]:
    for i in range(1, len(arr)):
        j = i
        while j > 0 and arr[j - 1] > arr[j]:
            arr[j - 1], arr[j] = arr[j], arr[j - 1]
            j -= 1
    return arr`,
    java: `public class Solution {
    public static int[] insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int j = i;
            while (j > 0 && arr[j - 1] > arr[j]) {
                int tmp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = tmp;
                j--;
            }
        }
        return arr;
    }
}`,
    cpp: `vector<int> insertionSort(vector<int> arr) {
    for (int i = 1; i < (int)arr.size(); i++) {
        int j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            swap(arr[j - 1], arr[j]);
            j--;
        }
    }
    return arr;
}`,
  },
  selection: {
    js: SELECTION_SORT_CODE,
    python: `def selection_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    java: `public class Solution {
    public static int[] selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            if (minIdx != i) {
                int tmp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = tmp;
            }
        }
        return arr;
    }
}`,
    cpp: `vector<int> selectionSort(vector<int> arr) {
    int n = (int)arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx != i) swap(arr[i], arr[minIdx]);
    }
    return arr;
}`,
  },
  merge: {
    js: MERGE_SORT_CODE,
    python: `def merge_sort(arr: list[int], lo: int = 0, hi: int | None = None) -> list[int]:
    if hi is None:
        hi = len(arr) - 1
    if lo >= hi:
        return arr
    mid = (lo + hi) // 2
    merge_sort(arr, lo, mid)
    merge_sort(arr, mid + 1, hi)
    merge(arr, lo, mid, hi)
    return arr


def merge(arr: list[int], lo: int, mid: int, hi: int) -> None:
    left = arr[lo:mid + 1]
    right = arr[mid + 1:hi + 1]
    i = j = 0
    k = lo
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            arr[k] = left[i]; i += 1
        else:
            arr[k] = right[j]; j += 1
        k += 1
    while i < len(left):
        arr[k] = left[i]; i += 1; k += 1
    while j < len(right):
        arr[k] = right[j]; j += 1; k += 1`,
    java: `public class Solution {
    public static void mergeSort(int[] arr, int lo, int hi) {
        if (lo >= hi) return;
        int mid = (lo + hi) / 2;
        mergeSort(arr, lo, mid);
        mergeSort(arr, mid + 1, hi);
        merge(arr, lo, mid, hi);
    }

    private static void merge(int[] arr, int lo, int mid, int hi) {
        int[] left = Arrays.copyOfRange(arr, lo, mid + 1);
        int[] right = Arrays.copyOfRange(arr, mid + 1, hi + 1);
        int i = 0, j = 0, k = lo;
        while (i < left.length && j < right.length) {
            arr[k++] = left[i] <= right[j] ? left[i++] : right[j++];
        }
        while (i < left.length) arr[k++] = left[i++];
        while (j < right.length) arr[k++] = right[j++];
    }
}`,
    cpp: `void merge(vector<int>& arr, int lo, int mid, int hi) {
    vector<int> left(arr.begin() + lo, arr.begin() + mid + 1);
    vector<int> right(arr.begin() + mid + 1, arr.begin() + hi + 1);
    int i = 0, j = 0, k = lo;
    while (i < (int)left.size() && j < (int)right.size()) {
        arr[k++] = left[i] <= right[j] ? left[i++] : right[j++];
    }
    while (i < (int)left.size()) arr[k++] = left[i++];
    while (j < (int)right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return;
    int mid = (lo + hi) / 2;
    mergeSort(arr, lo, mid);
    mergeSort(arr, mid + 1, hi);
    merge(arr, lo, mid, hi);
}`,
  },
  quick: {
    js: QUICK_SORT_CODE,
    python: `def quick_sort(arr: list[int], lo: int = 0, hi: int | None = None) -> list[int]:
    if hi is None:
        hi = len(arr) - 1
    if lo >= hi:
        return arr
    pivot = arr[hi]
    i = lo - 1
    for j in range(lo, hi):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[hi] = arr[hi], arr[i + 1]
    quick_sort(arr, lo, i)
    quick_sort(arr, i + 2, hi)
    return arr`,
    java: `public class Solution {
    public static void quickSort(int[] arr, int lo, int hi) {
        if (lo >= hi) return;
        int pivot = arr[hi];
        int i = lo - 1;
        for (int j = lo; j < hi; j++) {
            if (arr[j] < pivot) {
                i++;
                int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
            }
        }
        int tmp = arr[i + 1]; arr[i + 1] = arr[hi]; arr[hi] = tmp;
        quickSort(arr, lo, i);
        quickSort(arr, i + 2, hi);
    }
}`,
    cpp: `void quickSort(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return;
    int pivot = arr[hi];
    int i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[hi]);
    quickSort(arr, lo, i);
    quickSort(arr, i + 2, hi);
}`,
  },
  heap: {
    js: HEAP_SORT_CODE,
    python: `def heapify(arr: list[int], size: int, root: int) -> None:
    largest = root
    l, r = 2 * root + 1, 2 * root + 2
    if l < size and arr[l] > arr[largest]:
        largest = l
    if r < size and arr[r] > arr[largest]:
        largest = r
    if largest != root:
        arr[root], arr[largest] = arr[largest], arr[root]
        heapify(arr, size, largest)


def heap_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for end in range(n - 1, 0, -1):
        arr[0], arr[end] = arr[end], arr[0]
        heapify(arr, end, 0)
    return arr`,
    java: `public class Solution {
    public static int[] heapSort(int[] arr) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
        for (int end = n - 1; end > 0; end--) {
            int tmp = arr[0]; arr[0] = arr[end]; arr[end] = tmp;
            heapify(arr, end, 0);
        }
        return arr;
    }

    private static void heapify(int[] arr, int size, int root) {
        int largest = root, l = 2 * root + 1, r = 2 * root + 2;
        if (l < size && arr[l] > arr[largest]) largest = l;
        if (r < size && arr[r] > arr[largest]) largest = r;
        if (largest != root) {
            int tmp = arr[root]; arr[root] = arr[largest]; arr[largest] = tmp;
            heapify(arr, size, largest);
        }
    }
}`,
    cpp: `void heapify(vector<int>& arr, int size, int root) {
    int largest = root, l = 2 * root + 1, r = 2 * root + 2;
    if (l < size && arr[l] > arr[largest]) largest = l;
    if (r < size && arr[r] > arr[largest]) largest = r;
    if (largest != root) {
        swap(arr[root], arr[largest]);
        heapify(arr, size, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = (int)arr.size();
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int end = n - 1; end > 0; end--) {
        swap(arr[0], arr[end]);
        heapify(arr, end, 0);
    }
}`,
  },
};
