import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import getItemByStorageOne from "../utils/getItemByStorageOne";
import { getFormattedDate } from "../utils/getFormattedDate";
import { MemoRequestBody } from "../types/TelList";

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
  getCnsltItem: async (
    cstmrNo?: string, // 고객 번호
    cnsltNo?: string // 상담번호
  ) => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    const url = `/api/tel/cnslt/item?sptNo=${spt}&cstmrNo=${cstmrNo}&cnsltNo=${cnsltNo}`;
    return await instance.get(url);
  },
  getCnsltMemo: async (
    userNo?: string // 사용자 번호
  ) => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    const url = `/api/tel/cnslt/memo?sptNo=${spt}&userNo=${userNo}`;
    return await instance.get(url);
  },
  postCnsltMemo: async (requestData: { body: MemoRequestBody }) => {
    const url = `/api/tel/cnslt/memo`;
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

// 상담 한 건에 대한 상담 항목 리스트 조회
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
