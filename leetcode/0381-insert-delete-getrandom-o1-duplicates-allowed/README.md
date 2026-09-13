# 381. Insert Delete GetRandom O(1) - Duplicates allowed

Same as Insert Delete GetRandom O(1) (380), but the collection may now contain duplicate values. `insert(val)` returns whether `val` was *not already present at all* (i.e., true only the first time a given value is inserted), `remove(val)` removes one occurrence of `val` if any exist, and `getRandom()` returns a random element where each individual element (not each distinct value) is equally likely — so a value with more copies should be more likely to come up.

**Example:**
```
RandomizedCollection s = new RandomizedCollection();
s.insert(1);   // true, 1 is new
s.insert(1);   // false, 1 already existed
s.insert(2);   // true, 2 is new
s.getRandom(); // 1 with probability 2/3, 2 with probability 1/3
s.remove(1);   // true, removes one copy of 1
```

## Approach

The single-value version's trick — a hashmap from value to its one index in a backing array — breaks the moment duplicates are allowed, since a value can now live at multiple array positions simultaneously. The fix is to let the map hold a **set of indices** per value instead of a single index, while keeping the same backing-array-plus-swap-to-delete structure for O(1) random access and O(1) removal.

Keep an array of all elements (duplicates included, so a value's frequency in the array matches its actual count) and a hash map from value to the set of indices in the array where it currently appears.

`insert(val)`: append `val` to the array, add the new index to `indexes[val]`. Return true only if `indexes[val]` had zero entries before this insert (i.e., `val` is brand new to the collection).

`remove(val)`: if `indexes[val]` is empty, return false. Otherwise pick *any* one index of `val` as the slot to vacate, and remove that index from `indexes[val]` immediately — that single removal is what "one fewer occurrence of val" means, before anything else happens. Then, only if the vacated slot isn't already the array's last position, move the last element into that slot and update *its* value's index set (drop the old last-position index, add the newly occupied one), and pop the array's last element.

Removing the vacated index from `indexes[val]` *before* touching the moved element's bookkeeping is the detail that matters: if `val` happens to equal the value currently at the last position, doing the val-removal first and the moved-element update second means the two updates land on the same set without one undoing the other. Reversing that order (updating the moved value's set first, then discarding the vacated index from `indexes[val]`) ends up discarding two indices from the same set when only one occurrence was actually removed — an easy bug to introduce and one worth testing for explicitly, since it only shows up when the removed value and the last array element coincide.

`getRandom()`: same as before — pick a uniformly random index into the full array (duplicates and all), so values with more copies are proportionally more likely.

**Time complexity:** O(1) average for `insert`, `remove`, and `getRandom`.

**Space complexity:** O(n) for the array and the index sets.
