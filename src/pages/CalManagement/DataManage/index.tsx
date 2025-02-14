import { Stack } from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import TabMenus from "../../../components/Tab/TabMenus";
import ConsultationSearch from "./ConsultationSearch";
import CustomerSearch from "./CustomerSearch";
import ConsultationData from "./ConsultationData";
import CustomerData from "./CustomerData";

export default function DataManage() {
  const { value, handleChange: tabChange } = useTabs(0);
  return (
    <>
      <Stack minWidth={"20%"} height={"100%"}>
        <TabMenus value={value} handleChange={tabChange}>
          <TabMenus.Tab label="상담데이터" />
          <TabMenus.Tab label="고객데이터" />
        </TabMenus>
        {/* 탭에 따라 컴포넌트 체인지 */}
        {value === 0 ? (
          <ConsultationSearch />
        ) : value === 1 ? (
          <CustomerSearch />
        ) : null}
      </Stack>

      <Stack
        width={"80%"}
        bgcolor={"white"}
        height={"100%"}
        marginLeft={1}
      >
        {value === 0 ? (
          <ConsultationData />
        ) : value === 1 ? (
          <CustomerData />
        ) : null}
      </Stack>
    </>
  );
}
