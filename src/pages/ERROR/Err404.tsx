import { Stack, Typography } from "@mui/material";

export default function Err404() {
  return (
    <Stack
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      paddingBottom={25}
    >
      <Typography fontSize={"9rem"} fontWeight={"bold"} color="primary.main">
        404
      </Typography>
      <Typography variant="h3" color="primary.main">
        존재하지 않는 페이지입니다.
      </Typography>
    </Stack>
  );
}
