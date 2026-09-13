class Solution {
public:
    int numOfWays(int n) {
        const long long MOD = 1'000'000'007;
        long long aba = 6, abc = 6;

        for (int i = 1; i < n; i++) {
            long long newAba = (aba * 3 + abc * 2) % MOD;
            long long newAbc = (aba * 2 + abc * 2) % MOD;
            aba = newAba;
            abc = newAbc;
        }

        return (int)((aba + abc) % MOD);
    }
};
