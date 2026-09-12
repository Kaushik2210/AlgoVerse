class Solution {
    public String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) {
            return "0";
        }

        int n1 = num1.length(), n2 = num2.length();
        int[] result = new int[n1 + n2];

        for (int i = n1 - 1; i >= 0; i--) {
            int d1 = num1.charAt(i) - '0';
            for (int j = n2 - 1; j >= 0; j--) {
                int d2 = num2.charAt(j) - '0';
                int total = d1 * d2 + result[i + j + 1];
                result[i + j + 1] = total % 10;
                result[i + j] += total / 10;
            }
        }

        StringBuilder sb = new StringBuilder();
        int start = 0;
        while (start < result.length - 1 && result[start] == 0) {
            start++;
        }
        for (int i = start; i < result.length; i++) {
            sb.append(result[i]);
        }

        return sb.toString();
    }
}
