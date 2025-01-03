import { Box, styled } from "@mui/material";
import { appBarHeight } from "../../config";
import AppbarButton from "../appbar/AppbarButton";
import { Select } from "../Select";
import useSelect from "../../hooks/useSelect";
import UserInfo from "./UserInfo";
import { useSiteList } from "../../api/siteList";
import getItemByStorageOne from "../../utils/getItemByStorageOne";
import { useEffect } from "react";
import { filterDataByValues } from "../../utils/filterDataByValues";

// AppBarArea 컴포넌트: 앱바 영역
const AppBarArea = styled(Box)(({ theme }) => ({
  display: "flex",
  height: `${appBarHeight}px`,
  minHeight: `${appBarHeight}px`,
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.appbar.appbarBg,
  borderBottom: "1px solid",
  borderColor: theme.palette.appbar.appbarBorderColor,
  position: "relative",
  padding: "0 20px 0 20px",
}));

// 실시간으로 상태를 받아서 보여주어야 함
export default function Appbar() {
  const sptNo = getItemByStorageOne("selectedSite")?.sptNo;

  const { data } = useSiteList();

  const { selectListData, selectValue, handleChange } = useSelect(
    data?.data.contents,
    "sptNo", // 현장 번호
    "sptNm", // 현장명
    sptNo
  );

  useEffect(() => {
    // 현장 선택 데이터가 바뀌면
    // data에서 해당 현장 정보를 가져와서
    // storage에 저장된 값을 바꾸어야 함
    // 그리고 사이트를 리셋함
    console.log("현장:", selectValue);
    console.log("데이터 리스트:", data?.data.contents);
    console.log(sptNo == selectValue);
    console.log(
      filterDataByValues({
        data: data?.data.contents,
        key: "sptNo",
        values: [selectValue],
      })
    );

    if (sptNo == selectValue) return;

    localStorage.setItem(
      "selectedSite",
      JSON.stringify(
        filterDataByValues({
          data: data?.data.contents,
          key: "sptNo",
          values: [selectValue],
        })
      )
    );
    // 위의 동작을 끝내고 나서 리프래시
    window.location.reload();
  }, [selectValue]);

  return (
    <AppBarArea>
      <Select
        value={selectValue}
        onChange={handleChange}
        selectData={selectListData}
        placeholder={"현장 선택"}
        sx={{ width: "160px" }}
      />
      <AppbarButton />
      <UserInfo />
    </AppBarArea>
  );
}
