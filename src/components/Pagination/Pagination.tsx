import { Pagination, PaginationItem } from "@mui/material";

interface PaginationProps {
  count: number;
  defaultPage?: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
}
export default function _Pagination({
  count,
  defaultPage = 1,
  page = 1,
  ...rest
}: PaginationProps) {
  return (
    <Pagination
      count={count}
      defaultPage={defaultPage}
      page={page}
      variant="outlined"
      shape="rounded"
      {...rest}
      sx={{ display: "inline-flex" }}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          slots={{
            previous: () => <span> &lt; 이전 </span>,
            next: () => <span>다음 &gt;</span>,
          }}
        />
      )}
    />
  );
}
