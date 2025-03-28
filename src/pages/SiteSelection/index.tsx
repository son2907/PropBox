import { Stack, Typography } from "@mui/material";
import SearchInput from "../../components/Input/SearchInput";
import { useEffect, useRef, useState } from "react";
import SiteBtn from "./Btn/SiteBtn";
import { useAuthStore } from "../../stores/authStore";
import { useSiteList } from "../../api/siteList";
import BlackButton from "../../components/Button/BlackButton";
import { useSingleRowSelection } from "../../hooks/useSingleRowSelection";
import { filterDataByValues } from "../../utils/filterDataByValues";
import { useSptStore } from "../../stores/sptStore";
import ModalBox from "../../components/Modal";
import useModal from "../../hooks/useModal";
import NetworkSetupPop from "../NetworkSetup/popup";

export default function SiteSelection() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [errText, setErrText] = useState<string>("");

  const { openModal } = useModal();
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
    openModal(NetworkSetupPop, {
      modalId: "통신기기선택",
      stack: true, // 단일 모달 모드 = false,
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
    <ModalBox width={"350px"} height={"500px"}>
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
    </ModalBox>
  );
}
