// 전화상담 > 기본정보

// 전화관리 > 기본정보 > 상담항목 등록, 수정
export type BasicItemRequestType = {
  itemNo: string;
  sptNo: string;
  itemNm: string;
  lnupOrd: string;
  useYn: string;
  delYn: string;
  userId: string;
};

// 전화관리 > 기본정보 > 상담항목 정렬
export type BasicItemReorderRequestType = {
  sptNo: string;
  itemNo: string;
  lnupOrd: string;
  userId: string;
}[];

// 전화관리 > 기본정보 > 상담항목 삭제
export type BasicItemDeleteRequestType = {
  sptNo: string;
  detailNo: string;
  itemNo: string;
  userId: string;
};

// 전화관리 > 기본정보 > 상담 상세항목 등록, 수정
export type BasicDetItemRequestType = {
  sptNo: string;
  detailNo: string;
  itemNo: string;
  detailNm: string;
  lnupOrd: string;
  useYn: string;
  delYn: string;
  userId: string;
};

// 전화관리 > 기본정보 > 상담 상세항목 순서 변경
export type BasicDetItemReorderRequestType = {
  sptNo: string;
  detailNo: string;
  itemNo: string;
  lnupOrd: string;
  userId: string;
}[];

// 전화관리 > 기본정보 > 상담 상세항목 삭제
export type BasicDetItemDeleteRequestType = {
  sptNo: string;
  detailNo: string;
  itemNo: string;
  userId: string;
};

// 전화관리 > 기본정보 > 관리지역 등록, 수정
export type BasicAreaRequestType = {
  sptNo: string | null;
  areaNo: string | null;
  areaNm: string | null;
  lnupOrd: string | null;
  useYn: string | null;
  delYn: string | null;
  userId: string | null;
};

// 전화관리 > 기본정보 > 관리지역 삭제
export type BasicAreaDeleteRequestType = {
  sptNo: string;
  areaNo: string;
  areaNm: string;
  lnupOrd: string;
  useYn: string;
  delYn: string;
  userId: string;
};
