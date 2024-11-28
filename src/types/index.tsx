import { ReactNode } from "react";

export type PropsType = {
  children?: ReactNode;
  [property: string]: any;
};

export type tableDataType = {
  id: string;
  [key: string]: any;
};
