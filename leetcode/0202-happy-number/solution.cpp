class Solution {
public:
    bool isHappy(int n) {
        int slow = n;
        int fast = nextValue(n);
        while (fast != 1 && slow != fast) {
            slow = nextValue(slow);
            fast = nextValue(nextValue(fast));
        }
        return fast == 1;
    }

private:
    int nextValue(int x) {
        int total = 0;
        while (x > 0) {
            int digit = x % 10;
            x /= 10;
            total += digit * digit;
        }
        return total;
    }
};
