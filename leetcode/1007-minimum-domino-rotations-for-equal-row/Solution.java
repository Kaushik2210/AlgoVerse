class Solution {
    public int minDominoRotations(int[] tops, int[] bottoms) {
        int result = rotationsNeeded(tops, bottoms, tops[0]);
        if (result != -1) {
            return result;
        }
        return rotationsNeeded(tops, bottoms, bottoms[0]);
    }

    private int rotationsNeeded(int[] tops, int[] bottoms, int target) {
        int rotateTop = 0, rotateBottom = 0;
        for (int i = 0; i < tops.length; i++) {
            int a = tops[i], b = bottoms[i];
            if (a != target && b != target) {
                return -1;
            } else if (a != target) {
                rotateTop++;
            } else if (b != target) {
                rotateBottom++;
            }
        }
        return Math.min(rotateTop, rotateBottom);
    }
}
