class Solution {
    public String addBinary(String a, String b) {
        int i = a.length() - 1, j = b.length() - 1;
        int carry = 0;
        StringBuilder sb = new StringBuilder();

        while (i >= 0 || j >= 0 || carry != 0) {
            int bit1 = i >= 0 ? a.charAt(i) - '0' : 0;
            int bit2 = j >= 0 ? b.charAt(j) - '0' : 0;
            int total = bit1 + bit2 + carry;
            sb.append(total % 2);
            carry = total / 2;
            i--;
            j--;
        }

        return sb.reverse().toString();
    }
}
