import java.util.ArrayList;
import java.util.List;

class ProductOfNumbers {
    private List<Long> prefix;

    public ProductOfNumbers() {
        prefix = new ArrayList<>();
        prefix.add(1L);
    }

    public void add(int num) {
        if (num == 0) {
            prefix = new ArrayList<>();
            prefix.add(1L);
        } else {
            prefix.add(prefix.get(prefix.size() - 1) * num);
        }
    }

    public int getProduct(int k) {
        int size = prefix.size();
        if (k >= size) {
            return 0;
        }
        return (int) (prefix.get(size - 1) / prefix.get(size - 1 - k));
    }
}

/**
 * Your ProductOfNumbers object will be instantiated and called as such:
 * ProductOfNumbers obj = new ProductOfNumbers();
 * obj.add(num);
 * int param_2 = obj.getProduct(k);
 */
