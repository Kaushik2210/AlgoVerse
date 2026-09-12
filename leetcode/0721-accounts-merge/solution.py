from typing import List
from collections import defaultdict


class Solution:
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        parent = {}

        def find(x: str) -> str:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a: str, b: str) -> None:
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb

        email_to_name = {}

        for account in accounts:
            name = account[0]
            first_email = account[1]
            for email in account[1:]:
                parent.setdefault(email, email)
                email_to_name[email] = name
            for email in account[2:]:
                union(first_email, email)

        groups = defaultdict(list)
        for email in parent:
            groups[find(email)].append(email)

        result = []
        for root, emails in groups.items():
            result.append([email_to_name[root]] + sorted(emails))

        return result
