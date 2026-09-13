class Solution:
    def compareVersion(self, version1: str, version2: str) -> int:
        parts1 = version1.split(".")
        parts2 = version2.split(".")
        n = max(len(parts1), len(parts2))

        for i in range(n):
            v1 = int(parts1[i]) if i < len(parts1) else 0
            v2 = int(parts2[i]) if i < len(parts2) else 0
            if v1 < v2:
                return -1
            if v1 > v2:
                return 1

        return 0
