#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
using namespace std;

class Twitter {
private:
    int timer;
    unordered_map<int, vector<pair<int, int>>> tweets;   // userId -> [(timestamp, tweetId), ...]
    unordered_map<int, unordered_set<int>> following;     // userId -> followeeIds

public:
    Twitter() : timer(0) {}

    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({timer++, tweetId});
    }

    vector<int> getNewsFeed(int userId) {
        unordered_set<int> candidates = following[userId];
        candidates.insert(userId);

        // heap entry: (timestamp, tweetId, userId, indexInList)
        priority_queue<tuple<int, int, int, int>> heap;
        for (int uid : candidates) {
            auto it = tweets.find(uid);
            if (it != tweets.end() && !it->second.empty()) {
                int idx = (int)it->second.size() - 1;
                auto [ts, tid] = it->second[idx];
                heap.push({ts, tid, uid, idx});
            }
        }

        vector<int> result;
        while (!heap.empty() && (int)result.size() < 10) {
            auto [ts, tid, uid, idx] = heap.top();
            heap.pop();
            result.push_back(tid);
            if (idx > 0) {
                idx--;
                auto [nts, ntid] = tweets[uid][idx];
                heap.push({nts, ntid, uid, idx});
            }
        }

        return result;
    }

    void follow(int followerId, int followeeId) {
        if (followerId != followeeId) {
            following[followerId].insert(followeeId);
        }
    }

    void unfollow(int followerId, int followeeId) {
        following[followerId].erase(followeeId);
    }
};

/**
 * Your Twitter object will be instantiated and called as such:
 * Twitter* obj = new Twitter();
 * obj->postTweet(userId,tweetId);
 * vector<int> param_2 = obj->getNewsFeed(userId);
 * obj->follow(followerId,followeeId);
 * obj->unfollow(followerId,followeeId);
 */
