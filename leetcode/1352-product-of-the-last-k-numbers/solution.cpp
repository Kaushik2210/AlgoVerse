#include <vector>
using namespace std;

class ProductOfNumbers {
public:
    ProductOfNumbers() {
        prefix.push_back(1);
    }

    void add(int num) {
        if (num == 0) {
            prefix.clear();
            prefix.push_back(1);
        } else {
            prefix.push_back(prefix.back() * num);
        }
    }

    int getProduct(int k) {
        int size = prefix.size();
        if (k >= size) {
            return 0;
        }
        return (int) (prefix.back() / prefix[size - 1 - k]);
    }

private:
    vector<long long> prefix;
};

/**
 * Your ProductOfNumbers object will be instantiated and called as such:
 * ProductOfNumbers* obj = new ProductOfNumbers();
 * obj->add(num);
 * int param_2 = obj->getProduct(k);
 */
