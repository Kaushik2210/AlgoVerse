# 721. Accounts Merge

You're given a list of accounts, where each account is a list `[name, email1, email2, ...]` — the first element is the account owner's name, and the rest are emails owned by that account. Two accounts belong to the same person if they share at least one email in common, even transitively through a chain of other accounts (accounts are never merged just because they have the same name — only shared emails prove common ownership). Merge accounts that belong to the same person: return a list where each merged account is `[name, sorted emails...]`, sorted by their first email string.

**Example 1:**
```
Input: accounts = [
  ["John","johnsmith@mail.com","john_newyork@mail.com"],
  ["John","johnsmith@mail.com","john00@mail.com"],
  ["Mary","mary@mail.com"],
  ["John","johnnybravo@mail.com"]
]
Output: [
  ["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],
  ["Mary","mary@mail.com"],
  ["John","johnnybravo@mail.com"]
]
Explanation: the first two John accounts share johnsmith@mail.com, so they merge. The third John is a different person with no shared email, so it stays separate.
```

**Constraints:**
- 1 <= accounts.length <= 1000
- 2 <= accounts[i].length <= 10
- 1 <= accounts[i][j].length <= 30
- accounts[i][0] consists of English letters
- accounts[i][j] (for j > 0) is a valid email

## Approach

The relationship "these accounts belong to the same person" is transitive (if A shares an email with B, and B shares a different email with C, then A, B, and C are all the same person), which is exactly the structure a union-find (disjoint set union) data structure is built for.

Treat every distinct email as its own node. For each account, union all of its emails together (e.g. union each email with the first email in that account's list) — this captures "these emails belong together because one account lists them all". Also, while doing this, build a hashmap from each email to the owner's name (any account that touches that email has the same name, since if two accounts share an email they must be the same real person).

After processing all accounts, every email's "find" (root) identifies which merged group it belongs to. Group all emails by their root using another hashmap: root -> list of emails. For each group, sort its emails, prepend the owner's name (looked up from the email-to-name map using any email in the group), and that's one merged account in the output.

Path compression and union by rank on the union-find keep both `union` and `find` close to O(1) amortized, so the total work is dominated by the number of email references across all accounts.

**Time complexity:** O(N * alpha(N)) roughly, where N is the total number of email references — union-find operations are near-constant time with path compression, plus O(N log N) for sorting emails within groups at the end.

**Space complexity:** O(N) for the union-find structure and the grouping map.
