export function SortAlphabetically(list) {
  return list.sort((a, b) => {
    if (a.nazwa < b.nazwa) {
      return -1;
    }
    if (a.nazwa > b.nazwa) {
      return 1;
    }
    return 0;
  });
}
