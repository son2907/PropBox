import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import getItemByStorageOne from "../utils/getItemByStorageOne";
import { getFormattedDate } from "../utils/getFormattedDate";

const API = {
  // 상담 항목 목록
  getCnsltItemList: async () => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    return await instance.get(`/api/sptcnslt/itemlist/${spt}`);
  },
  getTelCnsltList: async (
    absnceYn?: string, // 전화받기/걸기구분
    trsmYn?: string // 통화여부 (선택적)
  ) => {
    // 쿼리 파라미터를 동적으로 생성
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    // const date = getFormattedDate(); // 상담 일자는 반드시 금일
    // ======================================테스트 날짜======================================
    const date = 20241223;
    const url = `/api/tel/cnslt?sptNo=${spt}&cnsltDt=${date}&callYn=${absnceYn}&trsmYn=${trsmYn}`;
    return await instance.get(url);
  },
  getCnsltDetail: async (
    cstmrNo?: string, // 고객번호
    cnsltNo?: string // 상담번호
  ) => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    const url = `/api/tel/cnslt/hist/detail?sptNo=${spt}&cstmrNo=${cstmrNo}&cnsltNo=${cnsltNo}`;
    return await instance.get(url);
  },
  getCnsltHistList: async (
    cstmrNo?: string // 고객 번호
  ) => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    const url = `/api/tel/cnslt/hist/list?sptNo=${spt}&cstmrNo=${cstmrNo}`;
    return await instance.get(url);
  },
};

const KEY = {
  getCnsltItemList: () => ["/api/sptcnslt/itemlist"],
  getTelCnsltList: (absnceYn?: string, trsmYn?: string) => [
    "/api/tel/cnslt",
    absnceYn,
    trsmYn,
  ],
  getCnsltDetail: (cstmrNo?: string, cnsltNo?: string) => [
    "/api/tel/cnslt/detail",
    cstmrNo,
    cnsltNo,
  ],
  getCnsltHistList: (cstmrNo?: string) => ["/api/tel/cnslt/hist/list", cstmrNo],
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

// 상담 상세
export const useCnsltDetail = (
  cstmrNo?: string, // 고객번호
  cnsltNo?: string // 상담번호
) => {
  return useQuery({
    queryKey: KEY.getCnsltDetail(cstmrNo, cnsltNo),
    queryFn: async () => {
      return await API.getCnsltDetail(cstmrNo, cnsltNo);
    },
    enabled: !!cstmrNo && !!cnsltNo,
  });
};

// 고객 한 명에 대한 상담 이력 (전화상담->최우측상단 테이블)
export const useCnslHist = (
  cstmrNo?: string // 고객번호호
) => {
  return useQuery({
    queryKey: KEY.getCnsltHistList(cstmrNo),
    queryFn: async () => {
      return await API.getCnsltHistList(cstmrNo);
    },
    enabled: !!cstmrNo,
  });
};
