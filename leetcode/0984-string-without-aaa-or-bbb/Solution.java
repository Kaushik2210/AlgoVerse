class Solution {
    public String strWithout3a3b(int a, int b) {
        StringBuilder result = new StringBuilder();

        while (a > 0 || b > 0) {
            int n = result.length();
            boolean lastTwoSame = n >= 2 && result.charAt(n - 1) == result.charAt(n - 2);

            if (lastTwoSame) {
                if (result.charAt(n - 1) == 'a') {
                    result.append('b');
                    b--;
                } else {
                    result.append('a');
                    a--;
                }
            } else {
                if (a >= b && a > 0) {
                    result.append('a');
                    a--;
                } else {
                    result.append('b');
                    b--;
                }
            }
        }

        return result.toString();
    }
}
