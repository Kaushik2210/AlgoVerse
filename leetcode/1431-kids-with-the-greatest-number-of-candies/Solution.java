import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<Boolean> kidsWithCandies(int[] candies, int extraCandies) {
        int greatest = 0;
        for (int c : candies) {
            greatest = Math.max(greatest, c);
        }

        List<Boolean> result = new ArrayList<>();
        for (int c : candies) {
            result.add(c + extraCandies >= greatest);
        }
        return result;
    }
}
