import type { CodeSamples } from "./types";
import { STACK_CODE } from "@/lib/algorithms/stack";

export const STACK_CODE_SAMPLES: Record<string, CodeSamples> = {
  push: {
    js: STACK_CODE.push,
    python: `def push(stack: list[int], value: int) -> list[int]:
    stack.append(value)  # O(1) — grows from the top
    return stack`,
    java: `import java.util.Deque;

public class Solution {
    public static void push(Deque<Integer> stack, int value) {
        stack.push(value); // O(1) — grows from the top
    }
}`,
    cpp: `#include <stack>
using namespace std;

void push(stack<int>& s, int value) {
    s.push(value); // O(1) — grows from the top
}`,
  },
  pop: {
    js: STACK_CODE.pop,
    python: `def pop(stack: list[int]) -> int:
    if not stack:
        raise IndexError("underflow")
    return stack.pop()`,
    java: `import java.util.Deque;
import java.util.EmptyStackException;

public class Solution {
    public static int pop(Deque<Integer> stack) {
        if (stack.isEmpty()) throw new EmptyStackException();
        return stack.pop();
    }
}`,
    cpp: `#include <stack>
#include <stdexcept>
using namespace std;

int pop(stack<int>& s) {
    if (s.empty()) throw runtime_error("underflow");
    int top = s.top();
    s.pop();
    return top;
}`,
  },
  peek: {
    js: STACK_CODE.peek,
    python: `def peek(stack: list[int]) -> int | None:
    if not stack:
        return None
    return stack[-1]`,
    java: `import java.util.Deque;

public class Solution {
    public static Integer peek(Deque<Integer> stack) {
        if (stack.isEmpty()) return null;
        return stack.peek();
    }
}`,
    cpp: `#include <stack>
#include <optional>
using namespace std;

optional<int> peek(stack<int>& s) {
    if (s.empty()) return nullopt;
    return s.top();
}`,
  },
  balanced: {
    js: STACK_CODE.balanced,
    python: `def is_balanced(expr: str) -> bool:
    pairs = {")": "(", "]": "[", "}": "{"}
    stack: list[str] = []
    for c in expr:
        if c in "([{":
            stack.append(c)
        elif c in pairs:
            if not stack or stack.pop() != pairs[c]:
                return False
    return len(stack) == 0`,
    java: `import java.util.*;

public class Solution {
    public static boolean isBalanced(String expr) {
        Map<Character, Character> pairs = Map.of(')', '(', ']', '[', '}', '{');
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : expr.toCharArray()) {
            if ("([{".indexOf(c) >= 0) {
                stack.push(c);
            } else if (pairs.containsKey(c)) {
                if (stack.isEmpty() || stack.pop() != pairs.get(c)) return false;
            }
        }
        return stack.isEmpty();
    }
}`,
    cpp: `#include <stack>
#include <string>
#include <unordered_map>
using namespace std;

bool isBalanced(const string& expr) {
    unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};
    stack<char> st;
    for (char c : expr) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else if (pairs.count(c)) {
            if (st.empty() || st.top() != pairs[c]) return false;
            st.pop();
        }
    }
    return st.empty();
}`,
  },
};
