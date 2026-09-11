import type { CodeSamples } from "./types";
import { BACKTRACKING_CODE } from "@/lib/algorithms/backtracking";

export const BACKTRACKING_CODE_SAMPLES: CodeSamples = {
  js: BACKTRACKING_CODE,
  python: `def subsets(values: list) -> list[list]:
    result = []

    def backtrack(index: int, path: list) -> None:
        if index == len(values):
            result.append(path[:])
            return

        path.append(values[index])  # 1. include
        backtrack(index + 1, path)
        path.pop()  # 2. undo — backtrack

        backtrack(index + 1, path)  # 3. exclude, recurse again

    backtrack(0, [])
    return result`,
  java: `public class Solution {
    public static List<List<Integer>> subsets(List<Integer> values) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(values, 0, new ArrayList<>(), result);
        return result;
    }

    private static void backtrack(List<Integer> values, int index, List<Integer> path, List<List<Integer>> result) {
        if (index == values.size()) {
            result.add(new ArrayList<>(path));
            return;
        }

        path.add(values.get(index)); // 1. include
        backtrack(values, index + 1, path, result);
        path.remove(path.size() - 1); // 2. undo — backtrack

        backtrack(values, index + 1, path, result); // 3. exclude, recurse again
    }
}`,
  cpp: `#include <vector>
using namespace std;

void backtrack(vector<int>& values, int index, vector<int>& path, vector<vector<int>>& result) {
    if (index == (int)values.size()) {
        result.push_back(path);
        return;
    }

    path.push_back(values[index]); // 1. include
    backtrack(values, index + 1, path, result);
    path.pop_back(); // 2. undo — backtrack

    backtrack(values, index + 1, path, result); // 3. exclude, recurse again
}

vector<vector<int>> subsets(vector<int>& values) {
    vector<vector<int>> result;
    vector<int> path;
    backtrack(values, 0, path, result);
    return result;
}`,
};
