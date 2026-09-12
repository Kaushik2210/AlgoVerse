from collections import deque, defaultdict
from typing import List


class Solution:
    def alienOrder(self, words: List[str]) -> str:
        graph = defaultdict(set)
        in_degree = {c: 0 for word in words for c in word}

        for w1, w2 in zip(words, words[1:]):
            min_len = min(len(w1), len(w2))
            found_diff = False
            for i in range(min_len):
                if w1[i] != w2[i]:
                    if w2[i] not in graph[w1[i]]:
                        graph[w1[i]].add(w2[i])
                        in_degree[w2[i]] += 1
                    found_diff = True
                    break
            if not found_diff and len(w1) > len(w2):
                return ""

        queue = deque([c for c in in_degree if in_degree[c] == 0])
        order = []

        while queue:
            c = queue.popleft()
            order.append(c)
            for nxt in graph[c]:
                in_degree[nxt] -= 1
                if in_degree[nxt] == 0:
                    queue.append(nxt)

        if len(order) != len(in_degree):
            return ""

        return "".join(order)
