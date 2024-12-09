import { Box, styled } from "@mui/material";
import { appBarHeight } from "../../config";
import AppbarButton from "../appbar/AppbarButton";
import { Select } from "../Select";
import useSelect from "../../hooks/useSelect";
import UserInfo from "./UserInfo";
import { useSiteList } from "../../api/siteList";
import getItemByStorageOne from "../../utils/getItemByStorageOne";

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
