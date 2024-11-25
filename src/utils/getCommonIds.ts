export const getCommonIds = (
  set1: Set<string>,
  set2: Set<string>
): string[] => {
  // set1과 set2의 교집합을 구하는 방법
  const commonIds = new Set<string>();
  set1.forEach((id) => {
    if (set2.has(id)) {
      commonIds.add(id);
    }
  });

  // Set을 배열로 변환하여 반환
  return [...commonIds];
};
