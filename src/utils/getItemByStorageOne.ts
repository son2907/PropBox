export default function getItemByStorageOne(key: string) {
  return JSON.parse(localStorage.getItem(key) || "[]")[0];
}
