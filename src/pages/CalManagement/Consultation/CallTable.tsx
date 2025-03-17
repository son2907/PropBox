import useTabs from "../../../hooks/useTabs";
import BasicTable from "../../../components/Table/BasicTable";
import SearchResult from "../../../components/Table/SearchResult";
import { Stack } from "@mui/material";
import TabPanel from "../../../components/Tab/TabPanel";
import { TabType } from "../../../types/menu";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { openPopup } from "../../../utils/openPopup";
import PathConstants from "../../../routers/path";
import TabMenus from "../../../components/Tab/TabMenus";
import TableBox from "../../../components/Box/TableBox";
import { useTelCnsltList } from "../../../api/callCnslt";
import { useEffect } from "react";
import { useCnsltStore } from "../../../stores/CunsltStore";
import { filterDataByValues } from "../../../utils/filterDataByValues";
import useDidMountEffect from "../../../hooks/useDidMountEffect";

export default function CallTable({ tabType, tabChange, selectedDate }: TabType & { selectedDate: Date }) {
  //  통화콜, 부재콜
  const { value: takeValue, handleChange: takeChange } = useTabs(0);

  // 대기, 부재, 통화콜, 기타
  const { value: callOptionValue, handleChange: callOptionChange } = useTabs(0);

  // 단일 선택
  const { selectedRow, toggleRowSelection, resetSelection } =
    useSingleRowSelection();

  const callPopupInfo = {
    url: PathConstants.Call.CallLog,
    windowFeatures: "width=1000,height=650,scrollbars=yes,resizable=yes",
    windowName: "전화걸기 처리내역",
  };

  // api -------------------------

  // tabType이 0이면 전화받기, 1이면 전화걸기
  // takeValue가 0이면 통화콜, 1이면 부재콜
  // callOptionValue 가 0이면 대기, 1이면 부재, 2면 통화콜

  // tabType이 0이면 takevalue로 trsmYn를 결정하고
  // tabType이 1이면 callOptionValue로 trsmYn를 결정함
  // 통화면 Y, 부재면 N, 대기면 W.

  //   callYn?: string, // 전화받기/걸기구분
  //   trsmYn?: string // 대기, 부재, 통화
  const callYn = tabType == 0 ? "N" : "Y";
  let trsmYn: string;

  if (tabType === 0) {
    trsmYn = takeValue === 0 ? "Y" : "N"; // 통화콜 또는 부재콜
  } else {
    switch (callOptionValue) {
      case 2:
        trsmYn = "Y"; // 통화콜
        break;
      case 1:
        trsmYn = "N"; // 부재
        break;
      case 0:
        trsmYn = "W"; // 대기
        break;
      default:
        trsmYn = "W"; // 대기
        break;
    }
  }
  useEffect(() => {
    console.log("날짜확인",selectedDate)
  },[selectedDate])

  const { data: cnsltData } = useTelCnsltList(callYn, trsmYn,selectedDate);
  const { fromSocket, setCnsltInfo, clear } = useCnsltStore();

  useDidMountEffect(() => {
    if (selectedRow.size > 0 && cnsltData?.data?.contents) {
      const selectedValues = Array.from(selectedRow);
      const { contents } = cnsltData.data;

      const processData = (key: string, cstmrKey: string, cnsltKey: string) => {
        const data = filterDataByValues({
          data: contents,
          key,
          values: selectedValues,
        });
        if (data.length > 0) {
          setCnsltInfo({
            fromSocket: false,
            cstmrNo: data[0][cstmrKey] || "",
            cnsltNo: data[0][cnsltKey] || "",
            callYn: callYn,
            trsmYn: trsmYn,
            cnsltTelno: data[0].cnsltTelno || "",
            cstmrNm: data[0].cstmrNm || "",
            mbtlNo: data[0].mbtlNo || "",
            telNo: data[0].telNo || "",
          });
        }
      };

      switch (trsmYn) {
        case "W":
          processData("waitCstmrNo", "waitCstmrNo", "cstmrNm");
          break;
        default:
          processData("seqNo", "cstmrNo", "cnsltNo");
          break;
      }
    }

    if (selectedRow.size == 0 && !fromSocket) {
      // 선택한 게 없으면서 socket으로부터 온 데이터가 아니면
      clear();
    }
  }, [selectedRow, cnsltData, callYn, trsmYn]);

  // Tab change 시에도 useCnsltStore에 값 저장
  useEffect(() => {
    resetSelection();
    if (tabType === 0) {
      // 전화받기 탭
      const trsmYn = takeValue === 0 ? "Y" : "N"; // 통화콜 또는 부재콜
      setCnsltInfo({
        callYn: "N", // 전화받기
        trsmYn,
      });
    } else {
      // 전화걸기 탭
      let trsmYn: string;
      switch (callOptionValue) {
        case 2:
          trsmYn = "Y"; // 통화콜
          break;
        case 1:
          trsmYn = "N"; // 부재
          break;
        case 0:
          trsmYn = "W"; // 대기
          break;
        default:
          trsmYn = "W"; // 대기
          break;
      }
      setCnsltInfo({
        callYn: "Y", // 전화걸기
        trsmYn,
      });
    }
  }, [tabType, takeValue, callOptionValue, setCnsltInfo]);

  return (
    <>
      <TabMenus value={tabType} handleChange={tabChange}>
        <TabMenus.Tab label="전화받기" disableRipple sx={{fontSize:"16px"}}/>
        <TabMenus.Tab label="전화걸기" disableRipple sx={{fontSize:"16px"}}/>
      </TabMenus>
      {/* 전화받기 탭 */}
      <Stack height={"100%"} overflow={"hidden"}>
        <TabPanel value={tabType} index={0}>
          <TabMenus value={takeValue} handleChange={takeChange}>
            <TabMenus.Tab label="통화콜" disableRipple sx={{fontSize:"16px"}}/>
            <TabMenus.Tab label="부재콜" disableRipple sx={{fontSize:"16px"}}/>
          </TabMenus>
          {/*  통화콜, 부재콜 탭에 따라 데이터가 바뀌도록 데이터 바인딩 해야함  */}

          <TableBox>
            <TableBox.Inner>
              <BasicTable data={cnsltData?.data.contents}>
                <BasicTable.Th>이름</BasicTable.Th>
                <BasicTable.Th>상담전화</BasicTable.Th>
                <BasicTable.Th>상담일시</BasicTable.Th>
                <BasicTable.Tbody>
                  {cnsltData?.data.contents.map((item: any, index: any) => {
                    return (
                      <BasicTable.Tr
                        key={index}
                        isClicked={selectedRow.has(item.seqNo)}
                        onClick={(e) => {
                          e.preventDefault(); // 기본 동작을 막음
                          e.stopPropagation(); // 이벤트 버블링을 막음
                          toggleRowSelection(item.seqNo); // row selection 토글
                        }}
                      >
                        <BasicTable.Td style={{ minWidth: "100px" }}>{item.cstmrNm}</BasicTable.Td>
                        <BasicTable.Td style={{ minWidth: "140px" }}>{item.cnsltTelno}</BasicTable.Td>
                        <BasicTable.Td style={{ minWidth: "160px" }}>{item.cnsltDttm}</BasicTable.Td>
                      </BasicTable.Tr>
                    );
                  })}
                </BasicTable.Tbody>
              </BasicTable>
            </TableBox.Inner>
          </TableBox>

          <SearchResult total={cnsltData?.data.totalCnt}/>
        </TabPanel>

        {/* 전화 걸기 탭 */}
        <TabPanel value={tabType} index={1}>
          <TabMenus value={callOptionValue} handleChange={callOptionChange}>
            <TabMenus.Tab label="대기" disableRipple />
            <TabMenus.Tab label="부재" disableRipple />
            <TabMenus.Tab label="통화콜" disableRipple />
            <TabMenus.Tab
              onClick={() => {
                openPopup({
                  url: callPopupInfo.url,
                  windowName: callPopupInfo.windowName,
                  windowFeatures: callPopupInfo.windowFeatures,
                });
              }}
              label="기타"
              disableRipple
            />
          </TabMenus>
          <TableBox>
            <TableBox.Inner>
              {
                // callOptionValue 가 0이면 대기, 1이면 부재, 2면 통화콜
                callOptionValue == 0 && (
                  <BasicTable data={cnsltData?.data.contents}>
                    <BasicTable.Th>이름</BasicTable.Th>
                    <BasicTable.Th>주제</BasicTable.Th>
                    <BasicTable.Tbody>
                      {cnsltData?.data.contents.map((item, index) => {
                        return (
                          <BasicTable.Tr
                            key={index}
                            isClicked={selectedRow.has(item.waitCstmrNo)}
                            onClick={(e) => {
                              toggleRowSelection(item.waitCstmrNo);
                              e.preventDefault(); // 기본 동작을 막음
                              e.stopPropagation(); // 이벤트 버블링을 막음
                            }}
                          >
                            <BasicTable.Td>{item.cstmrNm}</BasicTable.Td>
                            <BasicTable.Td>{item.themaNm}</BasicTable.Td>
                          </BasicTable.Tr>
                        );
                      })}
                    </BasicTable.Tbody>
                  </BasicTable>
                )
              }
              {(callOptionValue === 1 || callOptionValue === 2) && (
                <BasicTable data={cnsltData?.data.contents}>
                  <BasicTable.Th>이름</BasicTable.Th>
                  <BasicTable.Th>상담전화</BasicTable.Th>
                  <BasicTable.Th>상담일시</BasicTable.Th>
                  <BasicTable.Tbody>
                    {cnsltData?.data.contents.map((item: any, index: any) => {
                      return (
                        <BasicTable.Tr
                          key={index}
                          isClicked={selectedRow.has(item.seqNo)}
                          onClick={(e) => {
                            toggleRowSelection(item.seqNo);
                            e.preventDefault(); // 기본 동작을 막음
                            e.stopPropagation(); // 이벤트 버블링을 막음
                          }}
                        >
                          <BasicTable.Td style={{ minWidth: "100px" }}>{item.cstmrNm}</BasicTable.Td>
                          <BasicTable.Td style={{ minWidth: "140px" }}>{item.cnsltTelno}</BasicTable.Td>
                          <BasicTable.Td style={{ minWidth: "160px" }}>{item.cnsltDttm}</BasicTable.Td>
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              )}
            </TableBox.Inner>
          </TableBox>
          <SearchResult total={cnsltData?.data.totalCnt} />
        </TabPanel>
      </Stack>
    </>
  );
}
