import java.util.*;

class Solution {
    public String[] reorderLogFiles(String[] logs) {
        List<String> letterLogs = new ArrayList<>();
        List<String> digitLogs = new ArrayList<>();

        for (String log : logs) {
            int spaceIdx = log.indexOf(' ');
            char firstContentChar = log.charAt(spaceIdx + 1);
            if (Character.isDigit(firstContentChar)) {
                digitLogs.add(log);
            } else {
                letterLogs.add(log);
            }
        }

        letterLogs.sort((a, b) -> {
            int aSpace = a.indexOf(' ');
            int bSpace = b.indexOf(' ');
            String aId = a.substring(0, aSpace), aRest = a.substring(aSpace + 1);
            String bId = b.substring(0, bSpace), bRest = b.substring(bSpace + 1);

            int cmp = aRest.compareTo(bRest);
            if (cmp != 0) return cmp;
            return aId.compareTo(bId);
        });

        letterLogs.addAll(digitLogs);
        return letterLogs.toArray(new String[0]);
    }
}
