import random
import string


class Codec:
    def __init__(self):
        self.long_to_short = {}
        self.short_to_long = {}
        self.used_codes = set()
        self.alphabet = string.ascii_letters + string.digits

    def encode(self, longUrl: str) -> str:
        if longUrl in self.long_to_short:
            return self.long_to_short[longUrl]
        while True:
            code = ''.join(random.choice(self.alphabet) for _ in range(6))
            if code not in self.used_codes:
                break
        self.used_codes.add(code)
        short_url = "http://tinyurl.com/" + code
        self.long_to_short[longUrl] = short_url
        self.short_to_long[short_url] = longUrl
        return short_url

    def decode(self, shortUrl: str) -> str:
        return self.short_to_long[shortUrl]


# Your Codec object will be instantiated and called as such:
# codec = Codec()
# codec.decode(codec.encode(url))
