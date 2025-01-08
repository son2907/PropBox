import { Stack } from "@mui/material";
import TabMenus from "../../../components/Tab/TabMenus";
import useTabs from "../../../hooks/useTabs";
import WorkLogSearch from "./WorkLogSearch";
import WorkLog from "./WorkLog";
import AnalysisSearch from "./AnalysisSearch";
import AnalysisLog from "./AnalysisLog";
import GraphSearch from "./GraphSearch";
import Graph from "./Graph";

export default function Analysis() {
  const { value, handleChange: tabChange } = useTabs(0);
  return (
    <>
      <Stack width={"400px"} height={"100%"}>
        <TabMenus value={value} handleChange={tabChange}>
          <TabMenus.Tab label="업무일지" />
          <TabMenus.Tab label="상담분석" />
          <TabMenus.Tab label="그래프" />
        </TabMenus>
        {/* 탭에 따라 컴포넌트 체인지 */}
        {value === 0 ? (
          <WorkLogSearch />
        ) : value === 1 ? (
          <AnalysisSearch />
        ) : (
          <GraphSearch />
        )}
      </Stack>

      <Stack
        width={"calc(100% - 400px)"}
        minWidth={"700px"}
        bgcolor={"white"}
        height={"100%"}
        marginLeft={1}
      >
        {value === 0 ? <WorkLog /> : value === 1 ? <AnalysisLog /> : <Graph />}
      </Stack>
    </>
  );
}
