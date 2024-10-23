import { useState } from "react";

interface Item {
  id: string | number;
  label: string;
}

function not<T>(a: T[], b: T[]) {
  return a.filter((value) => !b.includes(value));
}

function intersection<T>(a: T[], b: T[]) {
  return a.filter((value) => b.includes(value));
}

function union<T>(a: T[], b: T[]) {
  return [...a, ...not(b, a)];
}

export function useTransferList(initialLeft: Item[], initialRight: Item[]) {
  const [checked, setChecked] = useState<Item[]>([]);
  const [left, setLeft] = useState<Item[]>(initialLeft);
  const [right, setRight] = useState<Item[]>(initialRight);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: Item) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: Item[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: Item[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  return {
    left,
    right,
    checked,
    leftChecked,
    rightChecked,
    handleToggle,
    handleToggleAll,
    handleCheckedRight,
    handleCheckedLeft,
    handleAllLeft,
    handleAllRight,
    numberOfChecked,
  };
}
