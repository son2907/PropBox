// SiteDataType 정의 (contents를 포함하도록 수정)
export type SiteDataType = {
  contents: SiteData[]; // contents는 SiteData[] 배열
  // 다른 필드들도 필요한 경우 추가
};

// SiteData 정의 (각 사이트에 대한 정보)
export type SiteData = {
  sptNo: string;
  userNo: string;
  sptNm: string;
  progrsSeCd: string;
  useYn: string;
  delYn: string;
  cntrctBgnde: string;
  cntrctEndde: string;
  realEndde: string;
  rmk: string;
  regrId: string;
  updrId: string;
  constntUserNo: string;
  userNm: string;
};
