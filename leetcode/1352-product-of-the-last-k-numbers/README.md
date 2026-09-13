# 1352. Product of the Last K Numbers

Design an algorithm that accepts a stream of integers and supports finding the product of the last `k` integers added so far.

Implement `ProductOfNumbers`:
- `ProductOfNumbers()` initializes the object with an empty stream.
- `void add(int num)` appends `num` to the stream.
- `int getProduct(int k)` returns the product of the last `k` numbers in the current stream. It's guaranteed no `getProduct` call happens before at least `k` numbers have been added.

**Example:**
```
Input:
["ProductOfNumbers","add","add","add","add","add","getProduct","getProduct","getProduct","add","getProduct"]
[[],[3],[0],[2],[5],[4],[2],[3],[4],[8],[2]]

Output: [null,null,null,null,null,null,20,40,0,null,32]
Explanation:
ProductOfNumbers p = new ProductOfNumbers();
p.add(3);           // stream: [3]
p.add(0);           // stream: [3,0]
p.add(2);           // stream: [3,0,2]
p.add(5);           // stream: [3,0,2,5]
p.add(4);           // stream: [3,0,2,5,4]
p.getProduct(2);     // 5 * 4 = 20
p.getProduct(3);     // 2 * 5 * 4 = 40
p.getProduct(4);     // 0 * 2 * 5 * 4 = 0
p.add(8);            // stream: [3,0,2,5,4,8]
p.getProduct(2);     // 4 * 8 = 32
```

**Constraints:**
- 0 <= num <= 100
- 1 <= k <= 4 * 10^4
- At most 4 * 10^4 calls total to `add` and `getProduct`.

## Approach

This is prefix products instead of prefix sums: `getProduct(k)` is `prefix[-1] / prefix[len - 1 - k]`, the same way a range sum divides out into a difference of two prefix sums. The complication is that a 0 anywhere in the window makes division undefined and also just... makes the whole product 0.

The fix is to reset the prefix list whenever a 0 is added. Since any window spanning a 0 has product 0 automatically, there's no need to track products through it — just start a fresh prefix list (seeded with 1, representing the empty product) from that point on. This means the prefix list at any time only ever reflects the run of non-zero numbers since the last 0.

`add(num)`: if `num` is 0, reset `prefix` to `[1]`; otherwise append `prefix[-1] * num`. `getProduct(k)`: if `k` is at least the length of the current prefix list, the window would have to reach back past a reset (i.e. past a 0), so the answer is 0. Otherwise it's `prefix[-1] // prefix[len(prefix) - 1 - k]`, cancelling out everything before the window.

**Time complexity:** O(1) amortized per `add` and O(1) per `getProduct`.

**Space complexity:** O(n) in the worst case (a stream with no zeros keeps every prefix product).
