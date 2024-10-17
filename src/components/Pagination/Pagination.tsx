import { Pagination, PaginationItem, Stack } from "@mui/material";

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
    <Stack spacing={2}>
      <Pagination
        count={count}
        defaultPage={defaultPage}
        page={page}
        variant="outlined"
        shape="rounded"
        {...rest}
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
    </Stack>
  );
}
