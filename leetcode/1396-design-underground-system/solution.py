class UndergroundSystem:
    def __init__(self):
        self.check_ins = {}   # id -> (station, t)
        self.trips = {}       # (start, end) -> [total_time, count]

    def checkIn(self, id: int, stationName: str, t: int) -> None:
        self.check_ins[id] = (stationName, t)

    def checkOut(self, id: int, stationName: str, t: int) -> None:
        start_station, start_t = self.check_ins.pop(id)
        key = (start_station, stationName)
        total_time, count = self.trips.get(key, (0, 0))
        self.trips[key] = (total_time + (t - start_t), count + 1)

    def getAverageTime(self, startStation: str, endStation: str) -> float:
        total_time, count = self.trips[(startStation, endStation)]
        return total_time / count


# Your UndergroundSystem object will be instantiated and called as such:
# obj = UndergroundSystem()
# obj.checkIn(id, stationName, t)
# obj.checkOut(id, stationName, t)
# param_3 = obj.getAverageTime(startStation, endStation)
