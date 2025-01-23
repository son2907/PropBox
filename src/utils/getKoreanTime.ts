export const getKoreanTime = () => {
  const now = new Date();
  now.setHours(now.getHours() + 9);
  return now.toISOString().replace("T", " ").slice(0, 23);
};

// 응답 예시 : 2025-01-24 18:55:12.123
