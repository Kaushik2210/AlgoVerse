import java.util.HashMap;
import java.util.Map;

class UndergroundSystem {
    private static class CheckIn {
        String station;
        int t;
        CheckIn(String station, int t) {
            this.station = station;
            this.t = t;
        }
    }

    private static class TripStats {
        int totalTime = 0;
        int count = 0;
    }

    private final Map<Integer, CheckIn> checkIns = new HashMap<>();
    private final Map<String, TripStats> trips = new HashMap<>();

    public UndergroundSystem() {
    }

    public void checkIn(int id, String stationName, int t) {
        checkIns.put(id, new CheckIn(stationName, t));
    }

    public void checkOut(int id, String stationName, int t) {
        CheckIn checkIn = checkIns.remove(id);
        String key = checkIn.station + "->" + stationName;
        TripStats stats = trips.computeIfAbsent(key, k -> new TripStats());
        stats.totalTime += t - checkIn.t;
        stats.count++;
    }

    public double getAverageTime(String startStation, String endStation) {
        TripStats stats = trips.get(startStation + "->" + endStation);
        return (double) stats.totalTime / stats.count;
    }
}

/**
 * Your UndergroundSystem object will be instantiated and called as such:
 * UndergroundSystem obj = new UndergroundSystem();
 * obj.checkIn(id,stationName,t);
 * obj.checkOut(id,stationName,t);
 * double param_3 = obj.getAverageTime(startStation,endStation);
 */
