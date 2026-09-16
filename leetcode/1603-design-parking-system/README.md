# 1603. Design Parking System

**Commonly asked at:** Amazon

Design a parking system for a parking lot with three kinds of parking spaces: big, medium, and small, with a fixed number of slots for each. Implement `ParkingSystem`:
- `ParkingSystem(big, medium, small)`: initializes the number of free slots for each car type (1 = big, 2 = medium, 3 = small).
- `addCar(carType)`: checks whether there's a parking space of `carType` available. If available, park the car (decrement the count) and return `true`, otherwise return `false`.

**Example:**
```
ParkingSystem parkingSystem = new ParkingSystem(1, 1, 0);
parkingSystem.addCar(1); // true, 1 big slot used
parkingSystem.addCar(2); // true, 1 medium slot used
parkingSystem.addCar(3); // false, no small slots
parkingSystem.addCar(1); // false, big slots full
```

**Constraints:**
- 0 <= big, medium, small <= 1000
- carType is 1, 2, or 3
- At most 1000 calls to addCar

## Approach

There's nothing to design here beyond a small fixed-size counter per car type. Store the three remaining-slot counts (indexed by car type, or just as three separate fields), and each `addCar` call just checks whether the count for that type is still positive — if so, decrement it and return true, otherwise return false.

**Time complexity:** O(1) per `addCar` call.

**Space complexity:** O(1) — three counters regardless of input size.
