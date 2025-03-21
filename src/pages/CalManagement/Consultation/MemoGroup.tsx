import { Box, Stack, Typography } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import { BasicButton } from "../../../components/Button";
import BasicInput from "../../../components/Input/BasicInput";
import useTabs from "../../../hooks/useTabs";
import TabPanel from "../../../components/Tab/TabPanel";
import BasicTable from "../../../components/Table/BasicTable";
import LabelTypo from "../../../components/Typography/LabelTypo";
import TextArea from "../../../components/TextArea/TextArea";
import TabMenus from "../../../components/Tab/TabMenus";
import {
  useCnslHist,
  useCnsltDetail,
  useCnsltMemo,
  usePostMemo,
} from "../../../api/callCnslt";
import { useCnsltStore } from "../../../stores/CunsltStore";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../../../stores/authStore";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useSptStore } from "../../../stores/sptStore";
import { useSingleRowData } from "../../../hooks/useTest";

export default function MemoGroup() {
  const { value, handleChange: tabChange } = useTabs(0);

  const { selectedRow, toggleRowSelection, resetSelection } =
    useSingleRowData<any>("cnsltNo");

  const { cstmrNo, trsmYn, fromSocket, socketTrsmYn } = useCnsltStore();
  const { userNo, loginId } = useAuthStore(["userNo", "loginId"]);
  const { data: histListData } = useCnslHist(
    cstmrNo,
    fromSocket ? socketTrsmYn : trsmYn
  );
  const { data: memoData } = useCnsltMemo(userNo);

  const memoRef = useRef<HTMLTextAreaElement>(null); // memo Ref
  const { mutate: postMemo } = usePostMemo();

  const { data: cnsltItemList } = useCnsltDetail(
    selectedRow?.cstmrNo,
    selectedRow?.cnsltNo
  );

  useEffect(() => {
    console.log("보내주는데이터확인:",histListData)
  },[])

  useEffect(() => {
    resetSelection();
  }, [histListData]);

  const { sptNo } = useSptStore();

  const postMemoFn = () => {
    const body = {
      sptNo: sptNo,
      userNo: userNo,
      memo: memoRef.current?.value || "",
      userId: loginId,
    };
    postMemo(
      {
        body: body,
      },
      {
        onSuccess: (res) => {
          console.log("메모 저장 성공:", res);
        },
        onError: (res) => {
          console.log("메모 저장 에러", res);
        },
      }
    );
  };

  return (
    <>
      <TabMenus value={value} handleChange={tabChange}>
        <TabMenus.Tab label="상담이력" disableRipple sx={{fontSize:"16px"}}/>
        <TabMenus.Tab label="메모" disableRipple sx={{fontSize:"16px"}}/>
      </TabMenus>
      <TabPanel value={value} index={0}>
        <Box style={{ height: "300px", marginTop: 1, overflow: "auto" }}>
          <BasicTable data={histListData?.data.contents}>
            <BasicTable.Th>구분</BasicTable.Th>
            <BasicTable.Th>일자</BasicTable.Th>
            <BasicTable.Th>특기사항</BasicTable.Th>
            <BasicTable.Th>상담내용</BasicTable.Th>
            <BasicTable.Tbody>
              {histListData?.data.contents.map((item: any, index: any) => {
                return (
                  <BasicTable.Tr
                    key={index}
                    isClicked={selectedRow?.cnsltNo === item.cnsltNo} // 전체 데이터 객체를 비교
                    onClick={() => toggleRowSelection(item)} // 데이터 자체를 전달
                  >
                    <BasicTable.Td style={{ minWidth: "100px" }}>{item.callYn}</BasicTable.Td>
                    <BasicTable.Td style={{ minWidth: "150px" }}>{item.cnsltDt}</BasicTable.Td>
                    <BasicTable.Td style={{ minWidth: "200px" }}>{item.spcmnt}</BasicTable.Td>
                    <BasicTable.Td style={{ minWidth: "200px" }}>상담내용</BasicTable.Td>
                  </BasicTable.Tr>
                );
              })}
            </BasicTable.Tbody>
          </BasicTable>
        </Box>
        <GrayBox marginBottom={1} gap={1}>
          <HiOutlineDocumentText />
          <Typography variant="h5" sx={{fontSize:"16px"}}>상담상세</Typography>
        </GrayBox>
        <Stack overflow={"hidden"} height={"100%"}>
          <Stack gap={1} overflow={"scroll"} height={"100%"}>
            <Box display={"flex"} alignItems={"center"} padding={1} justifyContent={"space-between"}>
              <LabelTypo sx={{fontSize:"16px"}}> 상담구분 </LabelTypo>
              <BasicInput
                key={cnsltItemList?.data.contents.callSe}
                defaultValue={cnsltItemList?.data.contents.callSe}
                readOnly
                sx={{width: "80%"}}
              />
            </Box>
            <Box display={"flex"} alignItems={"center"} padding={1} justifyContent={"space-between"}>
              <LabelTypo sx={{fontSize:"16px"}}> 일시 </LabelTypo>
              <BasicInput
                key={cnsltItemList?.data.contents.cnsltDtm}
                defaultValue={cnsltItemList?.data.contents.cnsltDtm}
                //fullWidth
                readOnly
                sx={{width:"80%"}}
              />
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              padding={1}
              marginBottom={3}
              justifyContent={"space-between"}
            >
              <LabelTypo sx={{fontSize:"16px"}}> 특기사항 </LabelTypo>
              <TextArea
                readOnly
                key={cnsltItemList?.data.contents.spcmnt}
                value={cnsltItemList?.data.contents.spcmnt}
              />
            </Box>
            {cnsltItemList?.data.contents.itemList.map(
              (item: any, index: any) => {
                return (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    paddingLeft={1}
                    paddingRight={1}
                    paddingBottom={1}
                    key={index}
                  >
                    <Typography width={150}>{item.itemNm}</Typography>
                    <BasicInput
                      key={item.detailNm}
                      defaultValue={item.detailNm}
                      readOnly
                      fullWidth
                    />
                  </Box>
                );
              }
            )}
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
        <TextArea value={memoData?.data.contents?.memo} ref={memoRef} />
      </TabPanel>
    </>
  );
}
