import useSelect from "./useSelect";

const defaultValue = [
  {
    value: 10,
    data: "10",
  },
  {
    value: 20,
    data: "20",
  },
  {
    value: 40,
    data: "40",
  },
  {
    value: 50,
    data: "50",
  },
];

interface TableSelectType {
  countValues?: { value: number; data: string }[] | undefined;
}

export function useTableSelect({
  countValues = defaultValue,
}: TableSelectType = {}) {
  const initialSelectedValue = countValues[0]?.data;

  // useSelect 호출
  const { selectValue, handleChange } = useSelect(
    countValues,
    "value",
    "data",
    initialSelectedValue
  );

  return { countValues, selectValue, handleChange };
}
