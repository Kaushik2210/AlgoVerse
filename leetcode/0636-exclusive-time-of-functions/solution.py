from typing import List


class Solution:
    def exclusiveTime(self, n: int, logs: List[str]) -> List[int]:
        result = [0] * n
        stack = []  # function ids, innermost active call on top
        prev_time = 0

        for log in logs:
            fn_id_str, action, time_str = log.split(':')
            fn_id = int(fn_id_str)
            time = int(time_str)

            if action == 'start':
                if stack:
                    result[stack[-1]] += time - prev_time
                stack.append(fn_id)
                prev_time = time
            else:  # 'end'
                result[stack.pop()] += time - prev_time + 1
                prev_time = time + 1

        return result
