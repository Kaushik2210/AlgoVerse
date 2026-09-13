# 353. Design Snake Game

*Note: this problem is LeetCode Premium — the description below is reconstructed from the public problem statement for reference.*

Design a Snake game that runs on a `width x height` board. The snake starts at `(0, 0)` with length 1. Implement `SnakeGame` with:
- `SnakeGame(width, height, food)`: initializes the board and a list of food positions, given in the order they should appear (only one piece of food is on the board at a time).
- `move(direction)`: moves the snake one cell in the given direction (`"U"`, `"D"`, `"L"`, or `"R"`) and returns the game's current score, or `-1` if the move causes the snake to go out of bounds or run into its own body. If the snake's new head position lands exactly on the current food's cell, the snake grows by one (the tail doesn't move that turn) and the score increases by 1; the next food in the list becomes active.

**Example:**
```
width = 3, height = 2, food = [[1,2],[0,1]]
move("R") -> 0   // snake: (0,0) -> (0,1)
move("D") -> 0   // snake: (0,1) -> (1,1)
move("R") -> 1   // snake: (1,1) -> (1,2), eats food[0], grows to [(1,1),(1,2)]
move("U") -> 1   // snake: head moves to (0,2), tail follows to (1,2), body [(1,2),(0,2)]
move("L") -> 2   // snake: head moves to (0,1), eats food[1], grows to [(1,2),(0,2),(0,1)]
move("U") -> -1  // head would move to (-1,1), out of bounds
```

**Constraints:**
- 1 <= width, height <= 25
- 1 <= food.length <= 50
- food[i].length == 2
- 0 <= food[i][0] < height, 0 <= food[i][1] < width
- At most 10^4 calls to move

## Approach

The snake's body is naturally a queue: the head grows at one end, and the tail shrinks from the other end whenever the snake doesn't eat. A deque represents this directly, with the head at the back and the tail at the front. Alongside it, keep a hash set mirroring the same cells for O(1) self-collision checks (scanning the deque itself for a collision would be O(length) per move).

On each `move`: compute the new head position from the current head plus the direction's offset, and immediately check it against the board bounds — an out-of-bounds move is an instant game over.

Next check whether the new head lands on the current food's coordinates (only the food at `food[foodIndex]` is ever active, since food appears one at a time in the given order). This determines whether the snake grows this turn.

Then check self-collision against the body set — but with one carve-out: the current tail cell is about to be vacated this same move (unless the snake is growing, in which case the tail stays put), so landing exactly on the tail is only a real collision when the snake isn't also eating food this turn. Any other occupied cell is always a genuine collision.

If nothing invalidates the move, push the new head onto the deque and set. If food was eaten, advance to the next food and bump the score, leaving the tail in place (the snake grew by one). Otherwise, pop the old tail off both the deque and the set, since the body didn't grow this turn.

**Time complexity:** O(1) per `move` call (hash set operations are O(1) average; encoding a 2D cell as a single integer key keeps the set simple).

**Space complexity:** O(n) where n is the snake's current length, for the deque and the mirrored hash set.
