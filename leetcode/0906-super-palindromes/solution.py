class Solution:
    def superpalindromesInRange(self, left: str, right: str) -> int:
        lo, hi = int(left), int(right)

        def is_palindrome(n: int) -> bool:
            s = str(n)
            return s == s[::-1]

        count = 0
        # A super-palindrome's square root only needs to go up to sqrt(hi),
        # and since hi <= 10^18, the root is at most ~10^9, i.e. at most
        # 5 digits need mirroring to build it as a palindrome.
        limit = 100000

        for seed in range(1, limit):
            s = str(seed)

            # odd-length palindrome root: mirror all but the last digit
            odd_root = int(s + s[-2::-1])
            # even-length palindrome root: mirror the whole seed
            even_root = int(s + s[::-1])

            for root in (odd_root, even_root):
                square = root * root
                if square > hi:
                    continue
                if square >= lo and is_palindrome(square):
                    count += 1

        return count
