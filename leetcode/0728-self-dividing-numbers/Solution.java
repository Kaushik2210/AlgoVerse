import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<Integer> selfDividingNumbers(int left, int right) {
        List<Integer> result = new ArrayList<>();
        for (int n = left; n <= right; n++) {
            if (isSelfDividing(n)) {
                result.add(n);
            }
        }
        return result;
    }

    private boolean isSelfDividing(int n) {
        int x = n;
        while (x > 0) {
            int digit = x % 10;
            if (digit == 0 || n % digit != 0) {
                return false;
            }
            x /= 10;
        }
        return true;
    }
}
