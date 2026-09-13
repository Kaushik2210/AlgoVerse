class Solution:
    def arrangeWords(self, text: str) -> str:
        words = text.split()
        words[0] = words[0].lower()
        # stable sort preserves original relative order among equal lengths
        words.sort(key=len)
        words[0] = words[0].capitalize()
        return ' '.join(words)
