import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Queue;
import java.util.Set;

/**
 * // This is the HtmlParser's API interface.
 * // You should not implement it, or speculate about its implementation
 * interface HtmlParser {
 *     public List<String> getUrls(String url) {}
 * }
 */

class Solution {
    public List<String> crawl(String startUrl, HtmlParser htmlParser) {
        String hostname = hostname(startUrl);
        Set<String> visited = new HashSet<>();
        visited.add(startUrl);
        Queue<String> queue = new ArrayDeque<>();
        queue.offer(startUrl);

        while (!queue.isEmpty()) {
            String url = queue.poll();
            for (String nextUrl : htmlParser.getUrls(url)) {
                if (!visited.contains(nextUrl) && hostname(nextUrl).equals(hostname)) {
                    visited.add(nextUrl);
                    queue.offer(nextUrl);
                }
            }
        }

        return new ArrayList<>(visited);
    }

    private String hostname(String url) {
        // url looks like "http://host/path/..."; the hostname is the third '/'-separated token
        String[] parts = url.split("/");
        return parts[2];
    }
}
