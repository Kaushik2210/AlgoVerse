from collections import deque
from typing import List


class HtmlParser:
    def getUrls(self, url: str) -> List[str]:
        pass


class Solution:
    def crawl(self, startUrl: str, htmlParser: 'HtmlParser') -> List[str]:
        hostname = self._hostname(startUrl)
        visited = {startUrl}
        queue = deque([startUrl])

        while queue:
            url = queue.popleft()
            for next_url in htmlParser.getUrls(url):
                if next_url not in visited and self._hostname(next_url) == hostname:
                    visited.add(next_url)
                    queue.append(next_url)

        return list(visited)

    def _hostname(self, url: str) -> str:
        # url looks like "http://host/path/..."; the hostname is the third '/'-separated token
        return url.split('/')[2]
