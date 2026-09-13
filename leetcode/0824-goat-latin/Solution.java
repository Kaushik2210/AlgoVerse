class Solution {
    public String toGoatLatin(String sentence) {
        String vowels = "aeiouAEIOU";
        String[] words = sentence.split(" ");
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            String newWord;
            if (vowels.indexOf(word.charAt(0)) >= 0) {
                newWord = word + "ma";
            } else {
                newWord = word.substring(1) + word.charAt(0) + "ma";
            }
            StringBuilder wordBuilder = new StringBuilder(newWord);
            for (int k = 0; k <= i; k++) {
                wordBuilder.append('a');
            }
            if (i > 0) sb.append(' ');
            sb.append(wordBuilder);
        }

        return sb.toString();
    }
}
