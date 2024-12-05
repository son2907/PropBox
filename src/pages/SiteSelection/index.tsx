import { Stack, Typography } from "@mui/material";
import SearchInput from "../../components/Input/SearchInput";
import { useRef, useState } from "react";
import SiteBtn from "./Btn/SiteBtn";
import { useAuthStore } from "../../stores/authStore";
import { useSiteList } from "../../api/siteList";
import BlackButton from "../../components/Button/BlackButton";
import { useSingleRowSelection } from "../../hooks/useSingleRowSelection";
import { openPopup } from "../../utils/openPopup";
import PathConstants from "../../routers/path";

export default function SiteSelection() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const { userNm, mbtlNo } = useAuthStore(["userNm", "mbtlNo"]);
  const { data } = useSiteList();

  const { selectedRow: selectedSite, toggleRowSelection: setSelectSite } =
    useSingleRowSelection();

  const hasPopupOpenedRef = useRef(false);

  const filteredData = data?.data.contents.filter((item) =>
    item.sptNm.includes(searchText)
  );

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
              if (!hasPopupOpenedRef.current) {
                // 팝업이 열리지 않았다면 팝업 열기
                hasPopupOpenedRef.current = true;
                openPopup({
                  url: PathConstants.NetworkSetup,
                  windowName: "통신환경설정",
                  windowFeatures:
                    "width=300,height=250,scrollbars=no,resizable=no",
                });
              }
              setSelectSite(item.sptNo); // 선택 상태 업데이트
              hasPopupOpenedRef.current = true;
            }}
          >
            {item.sptNm}
          </SiteBtn>
        ))}
      </Stack>
      <BlackButton>선택</BlackButton>
    </Stack>
  );
}
