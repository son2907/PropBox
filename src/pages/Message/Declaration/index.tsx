import { Stack } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import { Select } from "../../../components/Select";
import { selectTestData, tableTestData } from "../../../utils/testData";
import useSelect from "../../../hooks/useSelect";
import SearchInput from "../../../components/Input/SearchInput";
import { BasicButton } from "../../../components/Button";
import TableBox from "../../../components/Box/TableBox";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import { Pagination } from "../../../components/Pagination";
import TableSelect from "../../../components/Select/TableSelect";
import { usePagination } from "../../../hooks/usePagination";
import CenteredBox from "../../../components/Box/CenteredBox";
import BasicTable from "../../../components/Table/BasicTable";
import IconSquareButton from "../../../components/Button/IconSquareButton";
import PathConstants from "../../../routers/path";
import { openPopup } from "../../../utils/openPopup";
import { useTableSelect } from "../../../hooks/useTableSelect";
import { useGetKccList, useGetKccMsg } from "../../../api/kcc";
import { useState } from "react";

export default function DeclarationMessage() {
  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(selectTestData, "value", "data");
  const { selectedRows: ts_1, toggleRowsSelection: tt_1 } =
    useMultiRowSelection();
  const { selectedRows: ts_2, toggleRowsSelection: tt_2 } =
    useMultiRowSelection();

  const [encptMbtlNo, setEncptMbtlNo] = useState("");

  const { currentPage, onChangePage } = usePagination();

  const spam = {
    url: PathConstants.Message.Sapm,
    windowName: "방송통신위원회 스팸 등록",
    windowFeatures: "width=1200,height=500,scrollbars=yes,resizable=yes",
  };

  const groupCell = {
    url: PathConstants.Message.GroupCell,
    windowName: "방송통신위원회 그룹셀",
  };

  const { countValues, selectValue, handleChange } = useTableSelect();

  const onClickGetMsg = (encptMbtlNo) => {
    setEncptMbtlNo(encptMbtlNo);
  };

  // -----------------------------API-----------------------------

  // TODO 그룹 선택할 수 있게 수정해야 함(api 또는 고정 데이터가 없음)
  const testGroupData = 1;
  const testEncpt = "AA9EE02D23DABA9C41B874B4F1332468";
  const { data: kccListData } = useGetKccList({ groupNo: testGroupData });
  const { data: kccMsgData } = useGetKccMsg({
    // encptMbtlNo
    encptMbtlNo: testEncpt,
  });

  console.log("kccListData:", kccListData);
  console.log("kccMsgData:", kccMsgData);
  return (
    <Stack width={"100%"} height={"100%"}>
      <GrayBox gap={1}>
        <Select
          selectData={sd_0}
          value={s_0}
          onChange={o_0}
          sx={{ width: "300px" }}
        />
        <SearchInput
          placeholder="입력창"
          sx={{ width: "250px", bgcolor: "primary.light" }}
        />
        <BasicButton sx={{ marginLeft: "auto" }}>수신거부등록</BasicButton>
        <BasicButton>삭제</BasicButton>
        <BasicButton
          onClick={() => {
            openPopup(spam);
          }}
        >
          엑셀업로드
        </BasicButton>
        <BasicButton
          onClick={() => {
            openPopup(groupCell);
          }}
        >
          그룹관리
        </BasicButton>
      </GrayBox>
      <TableBox gap={2}>
        <Stack width={"50%"} height={"100%"}>
          <TableBox.Inner>
            <CheckboxTable
              data={kccListData?.data?.contents}
              selectedRows={ts_1}
              toggleRowsSelection={tt_1}
            >
              <CheckboxTable.Thead>
                <CheckboxTable.Tr>
                  <CheckboxTable.CheckboxTh keyName="groupNo" />
                  <CheckboxTable.Th>그룹</CheckboxTable.Th>
                  <CheckboxTable.Th>신고전화번호</CheckboxTable.Th>
                  <CheckboxTable.Th>휴대전화</CheckboxTable.Th>
                  <CheckboxTable.Th>전화상담</CheckboxTable.Th>
                  <CheckboxTable.Th>설문</CheckboxTable.Th>
                  <CheckboxTable.Th>MGM</CheckboxTable.Th>
                  <CheckboxTable.Th>이벤트</CheckboxTable.Th>
                  <CheckboxTable.Th>방문상담</CheckboxTable.Th>
                  <CheckboxTable.Th>고객등록</CheckboxTable.Th>
                  <CheckboxTable.Th>메세지 조회</CheckboxTable.Th>
                </CheckboxTable.Tr>
              </CheckboxTable.Thead>

              <CheckboxTable.Tbody>
                {kccListData?.data?.contents?.map((item, index) => (
                  <CheckboxTable.Tr key={index} id={item.groupNo}>
                    <CheckboxTable.CheckboxTd item={item} keyName="groupNo" />
                    <CheckboxTable.Td>{item.grpNm}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.encptMbtlNo}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.sttemntTelno}</CheckboxTable.Td>
                    <CheckboxTable.Td>전화상담</CheckboxTable.Td>
                    <CheckboxTable.Td>설문</CheckboxTable.Td>
                    <CheckboxTable.Td>MGM</CheckboxTable.Td>
                    <CheckboxTable.Td>이벤트</CheckboxTable.Td>
                    <CheckboxTable.Td>방문상담</CheckboxTable.Td>
                    <CheckboxTable.Td>고객등록</CheckboxTable.Td>
                    <CheckboxTable.Td>
                      <BasicButton
                        onClick={() => {
                          onClickGetMsg(item.encptMbtlNo);
                        }}
                      >
                        조회
                      </BasicButton>
                    </CheckboxTable.Td>
                  </CheckboxTable.Tr>
                ))}
              </CheckboxTable.Tbody>
            </CheckboxTable>
          </TableBox.Inner>
          <CenteredBox margin={1} justifyContent={"space-between"}>
            <Pagination count={25} page={currentPage} onChange={onChangePage} />
            <TableSelect
              total={100}
              countValues={countValues}
              selectValue={selectValue}
              handleChange={handleChange}
            />
          </CenteredBox>
        </Stack>

        <Stack width={"50%"} height={"100%"}>
          <TableBox.Inner>
            <BasicTable data={kccMsgData?.data?.contents}>
              <BasicTable.Th>전송일시</BasicTable.Th>
              <BasicTable.Th>구분</BasicTable.Th>
              <BasicTable.Th>메시지</BasicTable.Th>

              <BasicTable.Tbody>
                {kccMsgData?.data?.contents?.map((item, index) => {
                  return (
                    <BasicTable.Tr key={index}>
                      <BasicTable.Td>{item.trnsmitTxt}</BasicTable.Td>
                      <BasicTable.Td>{item.smsKnd}</BasicTable.Td>
                      <BasicTable.Td>{item.trnsmitTxt}</BasicTable.Td>
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </TableBox.Inner>
          <CenteredBox margin={1} justifyContent={"space-between"}>
            <Pagination count={25} page={currentPage} onChange={onChangePage} />
            <TableSelect
              total={100}
              countValues={countValues}
              selectValue={selectValue}
              handleChange={handleChange}
            />
          </CenteredBox>
        </Stack>
      </TableBox>
    </Stack>
  );
}
