import { Box, FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material";
import SearchInput from "../../../../components/Input/SearchInput";
import { useRadioGroup } from "../../../../hooks/useRadioGroup";
import GrayBox from "../../../../components/Box/GrayBox";
import { BasicButton } from "../../../../components/Button";
import { useFindCustom } from "../../../../api/callCnslt";
import { useEffect, useRef, useState } from "react";
import BasicTable from "../../../../components/Table/BasicTable";
import { useSingleRowData } from "../../../../hooks/useTest";

export default function SearchCustomer() {
  const { selectedRow, toggleRowSelection, resetSelection } =
    useSingleRowData("cstmrNo");

  const searchInput = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { selectedValue: radioValue, handleRadioChange: setRadioValue } =
    useRadioGroup("name");

  const { data, refetch } = useFindCustom(
    radioValue === "number" ? { telno: searchQuery } : { cstmrNm: searchQuery }
  );

  const handleSearch = () => {
    if (searchInput.current) {
      setSearchQuery(searchInput.current.value);
    }
    refetch();
  };

  useEffect(() => {
    resetSelection();
  }, [data]);

  const saveCustomer = () => {
    if (selectedRow) {
      window.opener.postMessage(selectedRow, "*");
      console.log("넘겨주는 데이터:",selectedRow, "*")
      //window.close();
    }
  };

  return (
    <Stack padding={2} bgcolor={"white"} width={"100%"} height={"100%"}>
      <Box display={"flex"} alignItems="center" width="100%" paddingBottom={2}>
        <RadioGroup
          value={radioValue}
          onChange={(e) => {
            setRadioValue(e);
            setSearchQuery("");
            if (searchInput.current) {
              searchInput.current.value = "";
            }
          }}
          row
        >
          <FormControlLabel
            value="name"
            control={<Radio size="small" />}
            label="고객이름으로 검색"
            defaultChecked={true}
          />
          <FormControlLabel
            value="number"
            control={<Radio size="small" />}
            label="전화번호로 검색"
          />
        </RadioGroup>
        <SearchInput
          sx={{ marginLeft: "auto", width: "50%" }}
          placeholder="검색 내용을 입력하세요."
          ref={searchInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </Box>
      <Box display="flex" height={"100%"} overflow="hidden">
        <Box
          flexDirection={"column"}
          width={"100%"}
          overflow="auto"
          marginBottom={2}
        >
          <BasicTable data={[data?.data.contents]}>
            <BasicTable.Th>이름</BasicTable.Th>
            <BasicTable.Th>휴대전화</BasicTable.Th>
            <BasicTable.Th>집전화</BasicTable.Th>
            <BasicTable.Tbody>
              {data?.data.contents &&
                (data?.data.contents).map((item: any, index: any) => {
                  return (
                    <BasicTable.Tr
                      key={index}
                      isClicked={selectedRow?.cstmrNo === item.cstmrNo} // 전체 데이터 객체를 비교
                      onClick={() => toggleRowSelection(item)} // 데이터 자체를 전달
                    >
                      <BasicTable.Td>{item.cstmrNm}</BasicTable.Td>
                      <BasicTable.Td>{item.mbtlNo}</BasicTable.Td>
                      <BasicTable.Td>{item.telNo}</BasicTable.Td>
                    </BasicTable.Tr>
                  );
                })}
            </BasicTable.Tbody>
          </BasicTable>
        </Box>
      </Box>
      <GrayBox>
        <BasicButton sx={{ marginLeft: "auto" }} onClick={saveCustomer}>
          선택
        </BasicButton>
      </GrayBox>
    </Stack>
  );
}
