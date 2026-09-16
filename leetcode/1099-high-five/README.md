# 1099. High Five

**Commonly asked at:** Amazon, Goldman Sachs

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

You're given `items`, a list of `[student_id, score]` pairs. Each student is guaranteed to have at least 5 scores. For every student, compute the average of their top five scores (using integer division, i.e. rounded down), and return the results as `[student_id, average]` pairs sorted by `student_id` ascending.

**Example 1:**
```
Input: items = [[1,91],[1,92],[2,93],[2,97],[1,60],[2,77],[1,65],[1,87],[1,100],[2,100],[2,76]]
Output: [[1,87],[2,88]]
Explanation: Student 1's top five scores are 100,92,91,87,65 -> average 87.0 -> 87.
Student 2's top five (only five total) are 100,97,93,77,76 -> average 88.6 -> 88.
```

**Example 2:**
```
Input: items = [[1,100],[7,100],[1,100],[7,100],[1,100],[7,100],[1,100],[7,100],[1,100],[7,100]]
Output: [[1,100],[7,100]]
```

**Constraints:**
- 1 <= items.length <= 1000
- items[i].length == 2
- 1 <= id_i <= 1000
- 0 <= score_i <= 100
- Each student has at least 5 scores

## Approach

Rather than collecting every score per student and sorting the whole list just to grab the top 5, keep a min-heap of size at most 5 per student. Push every incoming score onto its student's heap, and whenever the heap grows past 5 entries, pop the smallest — this way the heap always holds exactly the five highest scores seen so far for that student (the "worst" of the current top five is the first thing evicted when a better score needs room).

After processing every item, each student's heap holds exactly their top five scores. Sum each heap and divide by 5 (integer division, matching the required rounding). Since answers must be sorted by student id, iterate over the student ids in sorted order when building the result.

**Time complexity:** O(n log 5) = O(n) for processing all items (each heap push/pop is O(log 5), a constant), plus O(k log k) to sort the k distinct student ids for output order.

**Space complexity:** O(k) heaps of size at most 5 each, where k is the number of distinct students — O(k) overall.
