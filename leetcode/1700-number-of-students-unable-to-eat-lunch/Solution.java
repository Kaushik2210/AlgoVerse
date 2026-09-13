class Solution {
    public int countStudents(int[] students, int[] sandwiches) {
        int[] count = new int[2]; // count[0] = circular preferers, count[1] = square
        for (int s : students) {
            count[s]++;
        }

        for (int sandwich : sandwiches) {
            if (count[sandwich] == 0) {
                break;
            }
            count[sandwich]--;
        }

        return count[0] + count[1];
    }
}
