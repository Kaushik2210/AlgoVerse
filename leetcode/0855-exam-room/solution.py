import bisect


class ExamRoom:
    def __init__(self, n: int):
        self.n = n
        self.seats = []  # kept sorted

    def seat(self) -> int:
        if not self.seats:
            chosen = 0
        else:
            # candidate 1: sit at seat 0, distance to nearest neighbor is seats[0]
            best_dist = self.seats[0]
            chosen = 0

            # candidates: gaps between consecutive occupied seats
            for i in range(len(self.seats) - 1):
                a, b = self.seats[i], self.seats[i + 1]
                dist = (b - a) // 2
                if dist > best_dist:
                    best_dist = dist
                    chosen = a + dist

            # candidate: sit at the last seat, distance to nearest neighbor
            # is n - 1 - seats[-1]
            last_dist = self.n - 1 - self.seats[-1]
            if last_dist > best_dist:
                best_dist = last_dist
                chosen = self.n - 1

        bisect.insort(self.seats, chosen)
        return chosen

    def leave(self, p: int) -> None:
        idx = bisect.bisect_left(self.seats, p)
        self.seats.pop(idx)
