import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import getItemByStorageOne from "../utils/getItemByStorageOne";
import { getFormattedDate } from "../utils/getFormattedDate";
import {
  CnsltInfoRequestType,
  CnsltItemListResponseType,
  AreaListItemListResponseType,
  DetailListResponseType,
  MemoRequestBody,
} from "../types/callCnslt";

const API = {
  // 상담 항목 목록
  getCnsltItemList: async () => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    return await instance.get<CnsltItemListResponseType>(
      `/api/sptcnslt/itemlist/${spt}`
    );
  },
  // 전화 받기, 전화 걸기 테이블
  getTelCnsltList: async (
    absnceYn?: string, // 전화받기/걸기구분
    trsmYn?: string // 통화여부 (선택적)
  ) => {
    // 쿼리 파라미터를 동적으로 생성
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    const date = getFormattedDate(); // 상담 일자는 반드시 금일
    // ======================================테스트 날짜======================================
    // const date = 20241223;
    // const date = 20250120;
    const url = `/api/tel/cnslt?sptNo=${spt}&cnsltDt=${date}&callYn=${absnceYn}&trsmYn=${trsmYn}`;
    return await instance.get(url);
  },
  // 오른쪽 상담 상세 목록
  getCnsltDetail: async (
    cstmrNo?: string, // 고객번호
    cnsltNo?: string // 상담번호
  ) => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    const url = `/api/tel/cnslt/hist/detail?sptNo=${spt}&cstmrNo=${cstmrNo}&cnsltNo=${cnsltNo}`;
    return await instance.get(url);
  },
  // 오른쪽 위 상담 이력 테이블
  getCnsltHistList: async (
    cstmrNo?: string // 고객 번호
  ) => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    const url = `/api/tel/cnslt/hist/list?sptNo=${spt}&cstmrNo=${cstmrNo}`;
    return await instance.get(url);
  },
  // InfoGroup - 상담 항목 리스트 조회 및 우측 상담 상세
  getCnsltItem: async (
    cstmrNo?: string, // 고객 번호
    cnsltNo?: string // 상담번호
  ) => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    const url = `/api/tel/cnslt/item?sptNo=${spt}&cstmrNo=${cstmrNo}&cnsltNo=${cnsltNo}`;
    return await instance.get(url);
  },
  // InfoGroup - 세부 항목
  getItemDetList: async ({
    itemNo,
    detailNm,
    useYn,
  }: {
    itemNo: string;
    detailNm?: string;
    useYn?: string;
  }) => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    let url = `/api/sptcnslt/itemdet/list/${spt}/${itemNo}`;
    if (detailNm) url += `&detailNm=${detailNm}`;
    if (useYn) url += `&useYn=${useYn}`;
    return await instance.get<DetailListResponseType>(url);
  },
  // 관리지역 목록
  getAreaList: async () => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    const url = `/api/sptcnslt/area/list/${spt}`;
    return await instance.get<AreaListItemListResponseType>(url);
  },
  // 메모
  getCnsltMemo: async (
    userNo?: string // 사용자 번호
  ) => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    const url = `/api/tel/cnslt/memo?sptNo=${spt}&userNo=${userNo}`;
    return await instance.get(url);
  },
  postCnsltMemo: async (requestData: { body: MemoRequestBody }) => {
    const url = `/api/tel/cnslt/memo`;
    return await instance.put(url, requestData.body);
  },
  // Info Group 수정 또는 추가
  postCnsltInfo: async (requestData: { body: CnsltInfoRequestType }) => {
    const url = `/api/tel/cnslt`;
    return await instance.post(url, requestData.body);
  },
};

const KEY = {
  getCnsltItemList: () => ["/sptcnslt/itemlist"],
  getTelCnsltList: (absnceYn?: string, trsmYn?: string) => [
    "/tel/cnslt",
    absnceYn,
    trsmYn,
  ],
  getCnsltDetail: (cstmrNo?: string, cnsltNo?: string) => [
    "/tel/cnslt/hist/detail",
    cstmrNo,
    cnsltNo,
  ],
  getCnsltHistList: (cstmrNo?: string) => ["/tel/cnslt/hist/list", cstmrNo],
  getCnsltItem: (cstmrNo?: string, cnsltNo?: string) => [
    "/tel/cnslt/item",
    cstmrNo,
    cnsltNo,
  ],
  getCnsltMemo: (userNo?: string) => ["/tel/cnslt/memo", userNo],
  postCnsltMemo: () => ["/api/tel/cnslt/memo"],
  getItemDetList: ({
    itemNo,
    detailNm,
    useYn,
  }: {
    itemNo: string;
    detailNm?: string;
    useYn?: string;
  }) => ["/api/sptcnslt/itemdet/list", itemNo, detailNm, useYn],
  getAreaList: () => ["/api/sptcnslt/area/list"],
  postCnsltInfo: () => ["/api/tel/cnslt"],
};

export const useCnsltItemList = () => {
  return useQuery({
    queryKey: KEY.getCnsltItemList(),
    queryFn: async () => {
      return await API.getCnsltItemList();
    },
  });
};

// 전화 받기, 전화 걸기 테이블
export const useTelCnsltList = (
  absnceYn?: string, // 전화받기/걸기구분
  trsmYn?: string // 통화여부
) => {
  return useQuery({
    queryKey: KEY.getTelCnsltList(absnceYn, trsmYn), // KEY에 매개변수 전달
    queryFn: async () => {
      return await API.getTelCnsltList(absnceYn, trsmYn);
    },
  });
};

// 오른쪽 상담 상세 목록
export const useCnsltDetail = (
  cstmrNo?: string, // 고객번호
  cnsltNo?: string, // 상담번호
  trsmYn?: string //대기 테이블일 경우 조회하지 않도록 처리함
) => {
  return useQuery({
    queryKey: KEY.getCnsltDetail(cstmrNo, cnsltNo),
    queryFn: async () => {
      return await API.getCnsltDetail(cstmrNo, cnsltNo);
    },
    enabled: !!cstmrNo && !!cnsltNo && trsmYn !== "W", // trsmYn이 'W'일 경우 쿼리 실행 안함
    gcTime: 0,
  });
};

// 오른쪽 위 상담 이력 테이블
export const useCnslHist = (
  cstmrNo?: string, // 고객번호
  trsmYn?: string //대기 테이블일 경우 조회하지 않도록 처리함
) => {
  return useQuery({
    queryKey: KEY.getCnsltHistList(cstmrNo),
    queryFn: async () => {
      return await API.getCnsltHistList(cstmrNo);
    },
    enabled: !!cstmrNo && trsmYn !== "W",
    gcTime: 0,
  });
};

// InfoGroup - 상담 항목 리스트 조회 및 우측 상담 상세
export const useCnsltItem = (
  cstmrNo?: string, // 고객번호
  cnsltNo?: string // 상담번호
) => {
  return useQuery({
    queryKey: KEY.getCnsltItem(cstmrNo, cnsltNo),
    queryFn: async () => {
      return await API.getCnsltItem(cstmrNo, cnsltNo);
    },
    enabled: !!cstmrNo && !!cnsltNo,
  });
};

// 세부 항목
export const useItemDetList = ({
  itemNo,
  detailNm,
  useYn,
}: {
  itemNo: string;
  detailNm?: string;
  useYn?: string;
}) => {
  return useQuery({
    queryKey: KEY.getItemDetList({ itemNo, detailNm, useYn }),
    queryFn: async () => {
      return await API.getItemDetList({ itemNo, detailNm, useYn });
    },
    enabled: !!itemNo,
  });
};

// 사용자에 대한 메모 조회
export const useCnsltMemo = (
  userNo?: string // 고객번호
) => {
  return useQuery({
    queryKey: KEY.getCnsltMemo(userNo),
    queryFn: async () => {
      return await API.getCnsltMemo(userNo);
    },
    enabled: !!userNo,
  });
};

export const usePostMemo = () => {
  return useMutation({
    mutationFn: (requstData: { body: MemoRequestBody }) =>
      API.postCnsltMemo(requstData),
    mutationKey: KEY.postCnsltMemo(),
  });
};

//전화 상담 관리지역 목록 조회
export const useAreaList = () => {
  return useQuery({
    queryKey: KEY.getAreaList(),
    queryFn: async () => {
      return await API.getAreaList();
    },
  });
};

// 상담 수정
export const usePostCnsltInfo = () => {
  return useMutation({
    mutationFn: (requstData: { body: CnsltInfoRequestType }) =>
      API.postCnsltInfo(requstData),
    mutationKey: KEY.postCnsltInfo(),
  });
};
