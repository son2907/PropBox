import { Box, Stack } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import { BasicButton } from "../../../components/Button";
import BasicInput from "../../../components/Input/BasicInput";
import useTabs from "../../../hooks/useTabs";
import TabPanel from "../../../components/Tab/TabPanel";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import LabelTypo from "../../../components/Typography/LabelTypo";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import TextArea from "../../../components/TextArea/TextArea";
import TabMenus from "../../../components/Tab/TabMenus";
import {
  useCnslHist,
  useCnsltItem,
  useCnsltMemo,
  usePostMemo,
} from "../../../api/callCnslt";
import { useCnsltStore } from "../../../stores/CunsltStore";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../../stores/authStore";
import getItemByStorageOne from "../../../utils/getItemByStorageOne";

export default function MemoGroup() {
  const { value, handleChange: tabChange } = useTabs(0);

  // 테이블 선택 조건이 없으므로 다중선택 ui 적용
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();

  const { cstmrNo, cnsltNo } = useCnsltStore(); // 사용자 번호와 상담 번호
  const { userNo, loginId } = useAuthStore(["userNo", "loginId"]); // 로그인 한 유저의 넘버

  const { data } = useCnslHist(cstmrNo);
  const { data: cnsltItemList } = useCnsltItem(cstmrNo, cnsltNo);
  const { data: memoData } = useCnsltMemo(userNo);

  const [histList, setHistList] = useState<any>([]);

  const [cnsltItem, setCnsltItem] = useState<any>([]);

  const [memo, setMemo] = useState<any>([]);

  const memoRef = useRef<HTMLTextAreaElement>(null); // memo Ref
  const { mutate: postMemo } = usePostMemo();
  const testData = {
    // sptNo: getItemByStorageOne("selectedSite").sptNo,
    sptNo: "3001",
    userNo: "2",
    memo: "테스트용으로 넣을 메모 값",
    userId: "sysmaster",
  };

  const postMemoFn = () => {
    postMemo(
      {
        body: testData,
      },
      {
        onSuccess: (res) => {
          console.log("성공했음:", res);
        },
        onError: (res) => {
          console.log("에러남", res);
        },
      }
    );
  };

  // 상담 상세
  // TO Do API 수정 후 상담구분, 일시, 특기사항을 바인딩
  useEffect(() => {
    if (cnsltItemList) {
      setCnsltItem(cnsltItemList?.data.contents);
    } else {
      setCnsltItem([]);
    }
  }, [cstmrNo, cnsltNo, cnsltItemList]);

  // 상담 이력 테이블
  useEffect(() => {
    if (data) {
      setHistList(data?.data.contents);
    } else {
      setHistList([]);
    }
  }, [cstmrNo, data]);

  // 메모
  useEffect(() => {
    if (memoData) {
      console.log("메모:", memoData);
      setMemo(memoData?.data.contents);
    } else {
      setHistList([]);
    }
  }, [userNo, memoData]);

  return (
    <>
      <TabMenus value={value} handleChange={tabChange}>
        <TabMenus.Tab label="상담이력" disableRipple />
        <TabMenus.Tab label="메모" disableRipple />
      </TabMenus>
      <TabPanel value={value} index={0}>
        <Box style={{ height: "300px", marginTop: 1, overflow: "auto" }}>
          <BasicTable data={tableTestData}>
            <BasicTable.Th>구분</BasicTable.Th>
            <BasicTable.Th>일자</BasicTable.Th>
            <BasicTable.Th>특기사항</BasicTable.Th>
            <BasicTable.Th>상담내용</BasicTable.Th>
            <BasicTable.Tbody>
              {histList.map((item, index) => {
                return (
                  <BasicTable.Tr
                    key={index}
                    isClicked={selectedRows.has(item.cnsltNo)}
                    onClick={() => toggleRowsSelection(item.cnsltNo)}
                  >
                    <BasicTable.Td>{item.callYn}</BasicTable.Td>
                    <BasicTable.Td>{item.cnsltDt}</BasicTable.Td>
                    <BasicTable.Td>{item.spcmnt}</BasicTable.Td>
                    <BasicTable.Td>상담내용</BasicTable.Td>
                  </BasicTable.Tr>
                );
              })}
            </BasicTable.Tbody>
          </BasicTable>
        </Box>
        <GrayBox marginBottom={1}>상담상세</GrayBox>
        <Stack overflow={"hidden"} height={"100%"}>
          <Stack gap={1} overflow={"scroll"} height={"100%"}>
            <Box display={"flex"} alignItems={"center"} padding={1}>
              <LabelTypo> 상담구분 </LabelTypo>
              <BasicInput fullWidth />
            </Box>
            <Box display={"flex"} alignItems={"center"} padding={1}>
              <LabelTypo> 일시 </LabelTypo>
              <BasicInput fullWidth />
            </Box>
            <Box display={"flex"} alignItems={"center"} padding={1}>
              <LabelTypo> 특기사항 </LabelTypo>
              <TextArea />
            </Box>
            {cnsltItem.map((item, index) => {
              return (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  paddingLeft={1}
                  paddingRight={1}
                  paddingBottom={1}
                  key={index}
                >
                  <LabelTypo>{item.itemNm}</LabelTypo>
                  <BasicInput
                    key={item.detailNm}
                    defaultValue={item.detailNm}
                    fullWidth
                  />
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GrayBox
          justifyContent={"space-between"}
          marginTop={1}
          marginBottom={1}
        >
          메모장
          <BasicButton onClick={postMemoFn}>저장</BasicButton>
        </GrayBox>
        <TextArea value={memo?.memo} ref={memoRef} />
      </TabPanel>
    </>
  );
}
