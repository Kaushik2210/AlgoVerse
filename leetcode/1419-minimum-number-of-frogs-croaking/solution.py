class Solution:
    def minNumberOfFrogs(self, croakOfFrogs: str) -> int:
        order = "croak"
        idx = {c: i for i, c in enumerate(order)}
        # count[i] = number of frogs currently sitting at position i in "croak"
        count = [0, 0, 0, 0, 0]
        busy = 0
        max_busy = 0

        for ch in croakOfFrogs:
            i = idx.get(ch, -1)
            if i == -1:
                return -1
            if i == 0:
                count[0] += 1
                busy += 1
                max_busy = max(max_busy, busy)
            else:
                if count[i - 1] == 0:
                    return -1
                count[i - 1] -= 1
                count[i] += 1
                if i == 4:  # 'k' completes a croak, frog becomes free
                    count[4] -= 1
                    busy -= 1

        if any(count[:4]):
            return -1
        return max_busy
