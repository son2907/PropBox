import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { Data, transformSelectData } from "../utils/transformSelectData";
import useDidMountEffect from "./useDidMountEffect";

export default function useSelect<T extends Data>(
  data: T[] | undefined,
  valueKey: string,
  dataKey: string,
  defaultValue?: any
) {
  // 선택된 값 상태 관리
  const [selectValue, setSelectValue] = useState<any>(defaultValue ?? "");

  useDidMountEffect(() => {
    setSelectValue(defaultValue ?? "");
  }, [defaultValue]);

  // 전체 데이터 변환
  // data가 undefined일 경우 빈 배열로 처리
  const selectListData =
    data && data.length > 0 ? transformSelectData(data, valueKey, dataKey) : [];

  const handleChange = (event: SelectChangeEvent<any>) => {
    setSelectValue(event.target.value);
  };

  return {
    selectListData,
    selectValue,
    handleChange,
  };
}
