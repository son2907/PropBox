export interface Data {
  [key: string]: any;
}

interface TransformedData {
  value: any;
  data: any;
}

export const transformSelectData = <T extends Data>(
  data: T[],
  valueKey: string,
  dataKey: string
): TransformedData[] => {
  if (!data || data.length === 0) return [];
  return data.map((item) => ({
    value: item[valueKey],
    data: item[dataKey],
  }));
};
