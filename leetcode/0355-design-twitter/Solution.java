import java.util.*;

class Twitter {
    private int timer;
    private final Map<Integer, List<int[]>> tweets;      // userId -> [[timestamp, tweetId], ...]
    private final Map<Integer, Set<Integer>> following;   // userId -> followeeIds

    public Twitter() {
        timer = 0;
        tweets = new HashMap<>();
        following = new HashMap<>();
    }

    public void postTweet(int userId, int tweetId) {
        tweets.computeIfAbsent(userId, k -> new ArrayList<>()).add(new int[]{timer++, tweetId});
    }

    public List<Integer> getNewsFeed(int userId) {
        Set<Integer> candidates = new HashSet<>(following.getOrDefault(userId, Collections.emptySet()));
        candidates.add(userId);

        // heap entries: {timestamp, tweetId, userId, indexInList}
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        for (int uid : candidates) {
            List<int[]> list = tweets.get(uid);
            if (list != null && !list.isEmpty()) {
                int idx = list.size() - 1;
                int[] entry = list.get(idx);
                heap.offer(new int[]{entry[0], entry[1], uid, idx});
            }
        }

        List<Integer> result = new ArrayList<>();
        while (!heap.isEmpty() && result.size() < 10) {
            int[] top = heap.poll();
            result.add(top[1]);
            int idx = top[3];
            if (idx > 0) {
                idx--;
                List<int[]> list = tweets.get(top[2]);
                int[] next = list.get(idx);
                heap.offer(new int[]{next[0], next[1], top[2], idx});
            }
        }

        return result;
    }

    public void follow(int followerId, int followeeId) {
        if (followerId != followeeId) {
            following.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
        }
    }

    public void unfollow(int followerId, int followeeId) {
        Set<Integer> set = following.get(followerId);
        if (set != null) {
            set.remove(followeeId);
        }
    }
}

/**
 * Your Twitter object will be instantiated and called as such:
 * Twitter obj = new Twitter();
 * obj.postTweet(userId,tweetId);
 * List<Integer> param_2 = obj.getNewsFeed(userId);
 * obj.follow(followerId,followeeId);
 * obj.unfollow(followerId,followeeId);
 */
