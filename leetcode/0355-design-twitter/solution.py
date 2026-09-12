import heapq
from collections import defaultdict
from typing import List


class Twitter:
    def __init__(self):
        self.timer = 0
        self.tweets = defaultdict(list)   # userId -> [(timestamp, tweetId), ...]
        self.following = defaultdict(set)  # userId -> set of followeeIds

    def postTweet(self, userId: int, tweetId: int) -> None:
        self.tweets[userId].append((self.timer, tweetId))
        self.timer += 1

    def getNewsFeed(self, userId: int) -> List[int]:
        candidates = set(self.following[userId])
        candidates.add(userId)

        heap = []
        for uid in candidates:
            if self.tweets[uid]:
                idx = len(self.tweets[uid]) - 1
                ts, tid = self.tweets[uid][idx]
                heapq.heappush(heap, (-ts, tid, uid, idx))

        result = []
        while heap and len(result) < 10:
            neg_ts, tid, uid, idx = heapq.heappop(heap)
            result.append(tid)
            if idx > 0:
                idx -= 1
                ts, next_tid = self.tweets[uid][idx]
                heapq.heappush(heap, (-ts, next_tid, uid, idx))

        return result

    def follow(self, followerId: int, followeeId: int) -> None:
        if followerId != followeeId:
            self.following[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        self.following[followerId].discard(followeeId)


# Your Twitter object will be instantiated and called as such:
# obj = Twitter()
# obj.postTweet(userId,tweetId)
# param_2 = obj.getNewsFeed(userId)
# obj.follow(followerId,followeeId)
# obj.unfollow(followerId,followeeId)
