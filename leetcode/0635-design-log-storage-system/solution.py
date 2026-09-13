from typing import List


class LogSystem:
    GRANULARITY = {"Year": 0, "Month": 1, "Day": 2, "Hour": 3, "Minute": 4, "Second": 5}

    def __init__(self):
        self.logs = []  # list of (id, [year, month, day, hour, minute, second])

    def _parse(self, timestamp: str):
        return list(map(int, timestamp.split(':')))

    def put(self, id: int, timestamp: str) -> None:
        self.logs.append((id, self._parse(timestamp)))

    def retrieve(self, start: str, end: str, granularity: str) -> List[int]:
        # only compare fields up through the requested granularity, ignore anything finer
        idx = self.GRANULARITY[granularity] + 1
        start_parts = self._parse(start)[:idx]
        end_parts = self._parse(end)[:idx]
        result = []
        for log_id, parts in self.logs:
            truncated = parts[:idx]
            if start_parts <= truncated <= end_parts:
                result.append(log_id)
        return result


# Your LogSystem object will be instantiated and called as such:
# obj = LogSystem()
# obj.put(id,timestamp)
# param_2 = obj.retrieve(start,end,granularity)
