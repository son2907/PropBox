import { Box, Stack } from "@mui/material";
import TabMenus from "../../../components/Tab/TabMenus";
import useTabs from "../../../hooks/useTabs";
import WorkLogSearch from "./WorkLogSearch";
import WorkLog from "./WorkLog";
import AnalysisSearch from "./AnalysisSearch";
import AnalysisLog from "./AnalysisLog";
import GraphSearch from "./GraphSearch";
import Graph from "./Graph";
import { useState } from "react";
import { GraphDataRequestType } from "../../../types/cnsultAnalysis";
import { useGetGraphData } from "../../../api/cnsultAnalysis";
import { getFormattedDate } from "../../../utils/getFormattedDate";

export default function Analysis() {
  const { value, handleChange: tabChange } = useTabs(0);

  // <---------------- 그래프 데이터 조회 ---------------->
  const [searchGraphKey, setSearchGraphKey] = useState<GraphDataRequestType>({
    fromDate: getFormattedDate(new Date(Date.now())),
    toDate: getFormattedDate(new Date(Date.now())),
    callYn: "N",
    itemNo: "dt",
  });
  const { data: graphData } = useGetGraphData(searchGraphKey);

  const onSearchGraph = (body: GraphDataRequestType) => {
    setSearchGraphKey(body);
  };

  return (
    <Box width={"100%"} height={"100%"} display={"flex"} id={"graph-container"}>
      <Stack width={"25%"} height={"100%"}>
        <TabMenus value={value} handleChange={tabChange}>
          <TabMenus.Tab label="업무일지" />
          <TabMenus.Tab label="상담분석" />
          <TabMenus.Tab label="그래프" />
        </TabMenus>
        {value === 0 ? (
          <WorkLogSearch />
        ) : value === 1 ? (
          <AnalysisSearch />
        ) : (
          <GraphSearch onSearchGraph={onSearchGraph} />
        )}
      </Stack>

      <Stack
        width={"75%"}
        minWidth={"700px"}
        bgcolor={"white"}
        height={"100%"}
        marginLeft={1}
      >
        {value === 0 ? (
          <WorkLog />
        ) : value === 1 ? (
          <AnalysisLog />
        ) : (
          <Graph graphData={graphData?.data?.contents} />
        )}
      </Stack>
    </Box>
  );
}
