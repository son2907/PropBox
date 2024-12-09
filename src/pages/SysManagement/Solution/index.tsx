import { Stack } from "@mui/material";
import MenuGroup from "./MenuGroup";
import SolutionGroup from "./SolutionGroup";
import useTabs from "../../../hooks/useTabs";

export default function SolutionManagement() {

  return (
    <>
      <Stack width={"50%"} minWidth={"800px"} bgcolor={"white"} marginLeft={1}>
        <SolutionGroup />
      </Stack>
      <Stack width={"50%"} minWidth={"800px"} bgcolor={"white"} marginLeft={1}>
        <MenuGroup />
      </Stack>
    </>
  );
}
