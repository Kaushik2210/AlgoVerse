# 355. Design Twitter

Design a simplified version of Twitter where users can post tweets, follow/unfollow other users, and see the 10 most recent tweets in their news feed. Implement the `Twitter` class:

- `Twitter()` — initializes the object.
- `void postTweet(int userId, int tweetId)` — posts a new tweet with id `tweetId` by `userId`. Each call to this function will have a unique `tweetId`.
- `List<Integer> getNewsFeed(int userId)` — retrieves the 10 most recent tweet ids in the user's news feed, from users the user follows and the user themself. Each item must be posted by a different user (i.e., ordered from most recent to least recent).
- `void follow(int followerId, int followeeId)` — the user with id `followerId` starts following the user with id `followeeId`.
- `void unfollow(int followerId, int followeeId)` — the user with id `followerId` stops following the user with id `followeeId`.

**Example:**
```
Input:
["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]

Output:
[null, null, [5], null, null, [6, 5], null, [5]]

Explanation:
Twitter twitter = new Twitter();
twitter.postTweet(1, 5);        // user 1 posts a new tweet (id = 5)
twitter.getNewsFeed(1);          // user 1's news feed should return [5]
twitter.follow(1, 2);            // user 1 follows user 2
twitter.postTweet(2, 6);        // user 2 posts a new tweet (id = 6)
twitter.getNewsFeed(1);          // user 1's news feed should return [6, 5]
twitter.unfollow(1, 2);          // user 1 unfollows user 2
twitter.getNewsFeed(1);          // user 1's news feed should return [5], since user 1 no longer follows user 2
```

**Constraints:**
- 1 <= userId, followerId, followeeId <= 500
- 0 <= tweetId <= 10^4
- All tweets have unique ids
- At most 3 * 10^4 calls total to postTweet, getNewsFeed, follow and unfollow

## Approach

Two things need tracking: who follows whom, and each user's own tweets in posting order. A `follows` map (`userId -> set of followeeIds`) handles the first. For tweets, each user keeps a list of `(timestamp, tweetId)` pairs, where `timestamp` is just a global counter that increments on every post — that gives a cheap, strictly increasing ordering key without needing real time.

The interesting part is `getNewsFeed`: gather the candidate tweet lists (the user's own, plus everyone they follow), and merge them to find the 10 most recent overall. Rather than concatenating every tweet from every followee and sorting the whole thing (wasteful when someone follows hundreds of people who've tweeted thousands of times), treat each user's tweet list as already sorted (newest last, since posts only append) and merge like in "merge k sorted lists" — a max-heap of "the most recent unconsumed tweet from each candidate user" pointer. Pop the globally most recent tweet, push that user's next-most-recent tweet back onto the heap, repeat until 10 tweets are collected or the heap is empty.

Each pop/push touches only the users actually involved, and since we only ever need 10 results, the heap never needs to hold more than one entry per followed user at a time.

**Time complexity:** `postTweet`/`follow`/`unfollow` are O(1) (or O(log n) if a followee set uses a balanced structure). `getNewsFeed` is O(k log k) where `k` is the number of people followed (each contributes at most a constant number of heap operations before the 10-tweet cap is hit).

**Space complexity:** O(u + t) where `u` is the number of users (for the follow graph) and `t` is the number of tweets stored across all users.
