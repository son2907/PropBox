import React, { ReactNode } from "react";

export const renderChild = (
  children: ReactNode,
  Component: React.ElementType
) => {
  return React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === Component
  ) as React.ReactElement | null;
};
