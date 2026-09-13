import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<Integer> getRow(int rowIndex) {
        List<Integer> row = new ArrayList<>();
        row.add(1);
        for (int j = 1; j <= rowIndex; j++) {
            long next = (long) row.get(j - 1) * (rowIndex - j + 1) / j;
            row.add((int) next);
        }
        return row;
    }
}
