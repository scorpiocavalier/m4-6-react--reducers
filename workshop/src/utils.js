/**
 * Utility function - produces an array for the values provided.
 *
 * @example range(0, 3) -> [0, 1, 2]
 * @example range(8, 12) -> [8, 9, 10, 11]
 */
export function range(start, end) {
  var ans = [];
  for (let i = start; i < end; i++) {
    ans.push(i);
  }
  return ans;
}
