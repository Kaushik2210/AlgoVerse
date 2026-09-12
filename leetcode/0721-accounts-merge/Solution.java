import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    private final Map<String, String> parent = new HashMap<>();

    private String find(String x) {
        while (!parent.get(x).equals(x)) {
            parent.put(x, parent.get(parent.get(x)));
            x = parent.get(x);
        }
        return x;
    }

    private void union(String a, String b) {
        String ra = find(a), rb = find(b);
        if (!ra.equals(rb)) {
            parent.put(ra, rb);
        }
    }

    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        Map<String, String> emailToName = new HashMap<>();

        for (List<String> account : accounts) {
            String name = account.get(0);
            String firstEmail = account.get(1);
            for (int i = 1; i < account.size(); i++) {
                String email = account.get(i);
                parent.putIfAbsent(email, email);
                emailToName.put(email, name);
            }
            for (int i = 2; i < account.size(); i++) {
                union(firstEmail, account.get(i));
            }
        }

        Map<String, List<String>> groups = new HashMap<>();
        for (String email : parent.keySet()) {
            groups.computeIfAbsent(find(email), k -> new ArrayList<>()).add(email);
        }

        List<List<String>> result = new ArrayList<>();
        for (Map.Entry<String, List<String>> entry : groups.entrySet()) {
            List<String> emails = entry.getValue();
            Collections.sort(emails);
            List<String> merged = new ArrayList<>();
            merged.add(emailToName.get(entry.getKey()));
            merged.addAll(emails);
            result.add(merged);
        }

        return result;
    }
}
