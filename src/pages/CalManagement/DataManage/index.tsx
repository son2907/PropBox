import { Stack } from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import TabMenus from "../../../components/Tab/TabMenus";
import ConsultationSearch from "./ConsultationSearch";
import CustomerSearch from "./CustomerSearch";
import ConsultationData from "./ConsultationData";
import CustomerData from "./CustomerData";
import { useForm } from "react-hook-form";
import useSelect from "../../../hooks/useSelect";
import {
  useGetCnsltCond,
  useGetCnsltData,
  useGetCustData,
} from "../../../api/dataManage";
import { useState } from "react";

export default function DataManage() {
  const { register, watch } = useForm({
    defaultValues: {
      searchKeyword: "",
      searchKeywordCust: "",
    },
  });
  const { value, handleChange: tabChange } = useTabs(0); // 탭 idx

  // <---------- 상담데이터 조건 검색 및 결과 리스트 ----------> //

  const { data: cond } = useGetCnsltCond(); // 상담데이터 조건
  const { mutate: getCnsltData } = useGetCnsltData(); // 상담데이터 조회 API
  const [cnsltResult, setCnsltResult] = useState<any>([]);

  const {
    selectListData: cnsltListData,
    selectValue: cnsltSelectValue,
    handleChange: cnsltHandleChange,
  } = useSelect(cond?.data?.contents, "itemNo", "itemNm");

  const searchCunlst = ({ body }) => {
    const bodyData = {
      ...body,
      addCond: cnsltSelectValue,
      addCondTxt: watch("searchKeyword"),
    };

    getCnsltData(
      { body: bodyData },
      {
        onSuccess: (data) => {
          if (data.data.code == 200) {
            setCnsltResult(data.data.contents);
          }
        },
      }
    );
  };

  // <---------- 고객데이터 조건 검색 및 결과 리스트 ----------> //

  const { mutate: getCustData } = useGetCustData();
  const [custResult, setCustResult] = useState<any>([]);

  const searchCust = ({ body }) => {
    const bodyData = {
      ...body,
    };

    getCustData(
      { body: bodyData },
      {
        onSuccess: (data) => {
          if (data.data.code == 200) {
            setCustResult(data.data.contents);
          }
        },
      }
    );
  };

  return (
    <>
      <Stack minWidth={"20%"} height={"100%"}>
        <TabMenus value={value} handleChange={tabChange}>
          <TabMenus.Tab label="상담데이터" />
          <TabMenus.Tab label="고객데이터" />
        </TabMenus>
        {/* 탭에 따라 컴포넌트 체인지 */}
        {value === 0 ? (
          <ConsultationSearch searchCunlst={searchCunlst} />
        ) : value === 1 ? (
          <CustomerSearch searchCust={searchCust} />
        ) : null}
      </Stack>

      <Stack width={"80%"} bgcolor={"white"} height={"100%"} marginLeft={1}>
        {value === 0 ? (
          <ConsultationData
            register={register}
            cnsltListData={cnsltListData}
            cnsltSelectValue={cnsltSelectValue}
            cnsltHandleChange={cnsltHandleChange}
            tableData={cnsltResult}
            setTableData={setCnsltResult}
          />
        ) : value === 1 ? (
          <CustomerData reigister={register} tableData={custResult} />
        ) : null}
      </Stack>
    </>
  );
}
