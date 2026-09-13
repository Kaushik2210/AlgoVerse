import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.TreeMap;

class FileSystem {
    private class Node {
        TreeMap<String, Node> children = new TreeMap<>();
        boolean isFile = false;
        StringBuilder content = new StringBuilder();
    }

    private final Node root = new Node();

    public FileSystem() {
    }

    private List<String> split(String path) {
        List<String> parts = new ArrayList<>();
        for (String p : path.split("/")) {
            if (!p.isEmpty()) parts.add(p);
        }
        return parts;
    }

    private Node walk(List<String> parts, boolean createDirs) {
        Node node = root;
        for (String p : parts) {
            if (!node.children.containsKey(p)) {
                if (createDirs) {
                    node.children.put(p, new Node());
                } else {
                    return null;
                }
            }
            node = node.children.get(p);
        }
        return node;
    }

    public List<String> ls(String path) {
        List<String> parts = split(path);
        Node node = walk(parts, false);
        if (node.isFile) {
            List<String> result = new ArrayList<>();
            result.add(parts.get(parts.size() - 1));
            return result;
        }
        return new ArrayList<>(node.children.keySet());
    }

    public void mkdir(String path) {
        walk(split(path), true);
    }

    public void addContentToFile(String filePath, String content) {
        Node node = walk(split(filePath), true);
        node.isFile = true;
        node.content.append(content);
    }

    public String readContentFromFile(String filePath) {
        Node node = walk(split(filePath), false);
        return node.content.toString();
    }
}

/**
 * Your FileSystem object will be instantiated and called as such:
 * FileSystem obj = new FileSystem();
 * List<String> param_1 = obj.ls(path);
 * obj.mkdir(path);
 * obj.addContentToFile(filePath,content);
 * String param_4 = obj.readContentFromFile(filePath);
 */
