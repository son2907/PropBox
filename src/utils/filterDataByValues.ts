import { Data } from "./transformSelectData";

interface FuType {
  data: Data[] | undefined;
  key: string;
  values: any[];
}

// 주어진 데이터 배열에서, key가 가진 값이 values에 포함된 것만 필터링하는 함수
export const filterDataByValues = ({ data, key, values }: FuType): Data[] => {
  if (!data) {
    return [];
  }
  return data.filter((item) => values.includes(item[key]));
};
