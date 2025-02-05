import { Stack, Typography } from "@mui/material";
import SearchInput from "../../components/Input/SearchInput";
import { useEffect, useRef, useState } from "react";
import SiteBtn from "./Btn/SiteBtn";
import { useAuthStore } from "../../stores/authStore";
import { useSiteList } from "../../api/siteList";
import BlackButton from "../../components/Button/BlackButton";
import { useSingleRowSelection } from "../../hooks/useSingleRowSelection";
import { openPopup } from "../../utils/openPopup";
import PathConstants from "../../routers/path";
import { filterDataByValues } from "../../utils/filterDataByValues";
import { useSptStore } from "../../stores/sptStore";

export default function SiteSelection() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [errText, setErrText] = useState<string>("");

  const { userNm, mbtlNo } = useAuthStore(["userNm", "mbtlNo"]);
  const { setSptData } = useSptStore();
  const { data } = useSiteList();

  const { selectedRow: selectedSite, toggleRowSelection: setSelectSite } =
    useSingleRowSelection();

  const filteredData = data?.data.contents.filter((item) =>
    item.sptNm.includes(searchText)
  );

  const onClickSiteBtn = (item: any) => {
    setSelectSite(item.sptNo); // 선택 상태 업데이트
  };

  const onClickSelectBtn = () => {
    if (selectedSite.size === 0) return setErrText("현장을 선택해 주십시오.");

    openPopup({
      url: PathConstants.NetworkSetup,
      windowName: "통신환경설정",
      windowFeatures: `width=300,height=250,scrollbars=no,resizable=no`,
    });
  };
  useEffect(() => {
    if (selectedSite.size === 0) setErrText("현장을 선택해 주십시오.");
    else setErrText("");
    // 선택된 데이터를 로컬 스토리지에 저장
    const parseData = filterDataByValues({
      data: data?.data.contents,
      key: "sptNo",
      values: Array.from(selectedSite),
    });
    setSptData(parseData[0]);
  }, [selectedSite]);

  return (
    <Stack
      width="100%"
      height="100%"
      bgcolor="primary.light"
      padding={2}
      gap={1}
    >
      <Typography paddingBottom={1}>
        {userNm} ( {mbtlNo} )
      </Typography>
      <Typography color="error.main">{errText}</Typography>
      <SearchInput
        ref={searchRef}
        placeholder="현장 검색"
        sx={{ height: "50px" }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)} // 검색어 업데이트
      />
      <Stack
        overflow={"auto"}
        padding={1}
        borderTop={"1px solid primary.500"}
        gap={1}
      >
        {filteredData?.map((item, index) => (
          <SiteBtn
            key={index}
            selected={selectedSite.has(item.sptNo)} // 선택 상태 전달
            onClick={() => {
              onClickSiteBtn(item);
            }}
          >
            {item.sptNm}
          </SiteBtn>
        ))}
      </Stack>
      <BlackButton onClick={onClickSelectBtn}>선택</BlackButton>
    </Stack>
  );
}
