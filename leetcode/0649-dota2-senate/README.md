# 649. Dota2 Senate

**Commonly asked at:** Amazon, Google

In the world of Dota2, senators from two parties, Radiant and Dire, vote on a change. Given a string `senate` where each character is `'R'` or `'D'` representing each senator's party in order, senators take turns in that order banning one senator from the opposing party (a banned senator loses all rights, including voting and banning others). If a party has no senators left, that party loses. This repeats round after round (continuing from where the previous round left off) until one party has banned every senator of the other. Return which party ultimately wins, `"Radiant"` or `"Dire"`.

**Example 1:**
```
Input: senate = "RD"
Output: "Radiant"
Explanation: senator R bans senator D in round 1, only R remains
```

**Example 2:**
```
Input: senate = "RDD"
Output: "Dire"
Explanation: R bans the first D, then the second D bans R, only D remains
```

**Constraints:**
- n == senate.length
- 1 <= n <= 10^4
- senate[i] is either 'R' or 'D'

## Approach

This isn't really about tracking positions on a circle and simulating bans one at a time with removals from an array (which would be awkward and slow) — it's about relative turn order, and there's a clean trick for that: two queues holding the indices of Radiant and Dire senators still in the game.

Process rounds by repeatedly comparing the front of each queue. Whichever index is smaller acts first (it's earlier in turn order) and bans the senator at the front of the other queue — that opposing senator's index is popped and discarded. The senator who just acted isn't out of the game, though; they just won't get another turn until everyone currently ahead of them (in this round and future rounds) has gone. That's captured by re-enqueueing their index as `index + n` — adding `n` (the total number of senators) pushes them exactly one full round back in turn order without needing to explicitly track a "round number" or which senators are already eliminated.

Keep popping from both queues and comparing fronts until one queue is empty — whichever party still has senators left in its queue at that point wins.

The key insight to double check with a test: this is NOT about position on the circle at all, it's purely about whose queued turn index comes up sooner — a senator who "loses" a ban doesn't get removed from turn order, their next turn just comes later (n slots later), which is exactly what pushing index+n encodes.

**Time complexity:** O(n) — each senator is banned or requeued a bounded number of times, and the total work across all rounds is linear in the number of senators.

**Space complexity:** O(n) for the two queues.
