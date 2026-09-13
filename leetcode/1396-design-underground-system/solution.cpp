#include <string>
#include <unordered_map>
using namespace std;

class UndergroundSystem {
public:
    UndergroundSystem() {}

    void checkIn(int id, string stationName, int t) {
        checkIns[id] = {stationName, t};
    }

    void checkOut(int id, string stationName, int t) {
        auto& in = checkIns[id];
        string key = in.first + "->" + stationName;
        auto& stats = trips[key];
        stats.first += t - in.second;
        stats.second += 1;
        checkIns.erase(id);
    }

    double getAverageTime(string startStation, string endStation) {
        auto& stats = trips[startStation + "->" + endStation];
        return (double)stats.first / stats.second;
    }

private:
    unordered_map<int, pair<string, int>> checkIns;      // id -> (station, t)
    unordered_map<string, pair<int, int>> trips;          // "start->end" -> (totalTime, count)
};

/**
 * Your UndergroundSystem object will be instantiated and called as such:
 * UndergroundSystem* obj = new UndergroundSystem();
 * obj->checkIn(id,stationName,t);
 * obj->checkOut(id,stationName,t);
 * double param_3 = obj->getAverageTime(startStation,endStation);
 */
