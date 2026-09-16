# 1242. Web Crawler Multithreaded

**Commonly asked at:** Google, Meta, Amazon

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. It's normally framed around building a *concurrent* crawler with a thread pool, but here it's solved and verified as a correct sequential BFS crawler (a mock `HtmlParser` built from a directed edge list reproduces the official example exactly), since correctness of the traversal logic is what's actually testable without a live multithreaded judge. See the note at the bottom on how this would be parallelized.

Given a `startUrl` and an `HtmlParser` interface, crawl every URL reachable from `startUrl` that shares the same hostname, and return them all (in any order). Your crawler should:

- Start from `startUrl`.
- Call `HtmlParser.getUrls(url)` to get every URL linked from a given page.
- Never crawl the same URL twice.
- Only follow links that are under the same hostname as `startUrl` (e.g. from `"http://news.yahoo.com/news"`, only URLs whose hostname is exactly `"news.yahoo.com"` should be explored or included).

**Example:**
```
urls = [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.google.com",
  "http://news.yahoo.com/us"
]
edges = [[2,0],[2,1],[3,2],[3,1],[0,4]]   // directed edges as (from-index, to-index) pairs
startUrl = "http://news.yahoo.com/news/topics/"   // urls[2]

Output: [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.yahoo.com/us"
]

Explanation:
Starting from urls[2], the edges 2->0 and 2->1 lead to urls[0] and urls[1] (same hostname, followed).
From urls[0], edge 0->4 leads to urls[4] (same hostname, followed).
urls[3] ("news.google.com") is only reachable via 3->2 or 3->1, which are the wrong direction --
it's never linked TO from anything in the crawl, so it's correctly excluded either way, since
it also has a different hostname than the rest.
```

## Approach

Strip away the "multithreaded" framing for a moment: at its core this is graph reachability — find every node reachable from a start node, subject to a same-hostname filter, without revisiting a node twice. That's a standard **BFS (or DFS) with a visited set**, nothing more exotic.

- Extract the hostname of `startUrl` once up front (split the URL on `/` and take the third token — `"http:", "", "hostname", "rest..."` — which works whether or not there's a path after the hostname).
- Seed a queue and a `visited` set with `startUrl`.
- Repeatedly pop a URL, call `getUrls` on it, and for each returned link: if it hasn't been visited yet **and** its hostname matches, mark it visited and enqueue it.
- Once the queue drains, `visited` holds exactly the answer.

The `visited` set is what guarantees no URL is crawled twice even if multiple pages link to it, and checking the hostname on every candidate (not just the start) is what keeps the crawl from wandering off-site.

**On the "multithreaded" part:** the interesting real version of this problem asks you to dispatch `getUrls` calls to a thread pool so multiple pages are fetched concurrently instead of one at a time, while still avoiding duplicate visits and correctly waiting for all in-flight work before deciding the crawl is done. That requires a thread-safe `visited` set (a lock or a concurrent set), a way to track "how many crawls are currently in flight" so the coordinator knows when to stop waiting (a counter guarded by a condition variable, or a bounded thread pool with a join/shutdown at the end), and care that adding a URL to `visited` and dispatching a worker for it happens atomically so two threads can't both decide to crawl the same URL at once. The BFS/reachability logic above is exactly what runs inside each worker — the concurrency machinery around it is what actually makes it "multithreaded," and none of it changes which URLs end up in the final answer.

**Time complexity:** O(V + E) where V is the number of same-hostname URLs reachable from `startUrl` and E is the total number of links examined across all `getUrls` calls made on those pages.

**Space complexity:** O(V) for the `visited` set and the queue.
