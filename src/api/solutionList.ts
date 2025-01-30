import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import { deleteMenuType, deleteSolutionType, insertMenuType, insertSolutionType, ReorderSolutionListType, SolutionDetailResponse, SolutionMenuDetailResponse, SolutionMenuListResponse, SolutionResponse, updateMenuDetailType, updateSolutionType } from "../types/solution";

const API = {
    //솔루션 리스트
    getSolutionList: async () => {
        return await instance.get<SolutionResponse>('/api/slutn/list');
    },
    //솔루션 메뉴 리스트
    getSolutionMenuList: async (requsetData: string) => {
        const url = requsetData ? `/api/slutn/list/byslutn?slutnId=${requsetData}` : '/api/slutn/list/byslutn';
        return await instance.get<SolutionMenuListResponse>(url);
    },
    //솔루션 상세
    getSolutionDetail: async (id: string | null) => {
        const url = id ? `/api/slutn?slutnId=${id}` : '/api/slutn?slutnId';
        return await instance.get<SolutionDetailResponse>(url);
    },
    //솔루션 메뉴 상세
    getMenuDetail: async (id: string | null) => {
        const url = id ? `/api/slutn?slutnId=${id}` : '/api/slutn?slutnId';
        return await instance.get<SolutionMenuDetailResponse>(url);
    },
    //솔루션 추가
    insertSolution: async (requestData: { body: insertSolutionType }) => await instance.post('/api/slutn', requestData.body),
    //솔루션 메뉴 추가
    insertMenu: async (requestData: { body: insertMenuType }) => await instance.post('/api/slutn', requestData.body),
    //솔루션 수정
    updateSolution: async (requestData: { body: updateSolutionType }) => {
        console.log("API 요청 데이터:", requestData); // 요청 데이터 로깅
        const response = await instance.put('/api/slutn', requestData.body);
        console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    },
    //솔루션 메뉴 수정
    updateMenu: async (requestData: { body: updateMenuDetailType }) => {
        console.log("API 요청 데이터:", requestData); // 요청 데이터 로깅
        const response = await instance.put('/api/slutn', requestData.body);
        console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    },
    //솔루션 삭제
    deleteSolution: async (requstData: { body: deleteSolutionType }) => {
        const { slutnId } = requstData.body; // slutnId 추출
        const url = `/api/slutn/remove?slutnId=${slutnId}`; // URL에 slutnId 추가
        return await instance.post(url, requstData.body);
    },
    //솔루션 메뉴 삭제
    deleteMenu: async (requstData: { body: deleteMenuType }) => {
        const { slutnId } = requstData.body; // slutnId 추출
        const url = `/api/slutn/remove?slutnId=${slutnId}`; // URL에 slutnId 추가
        return await instance.post(url, requstData.body);
    },
    //솔루션 순서 변경
    reorderSolution: async (requestData : {body : ReorderSolutionListType}) => {
        const url = '/api/slutn/listord';
        return await instance.post(url, requestData.body);
    },
};

const KEY = {
    //솔루션 리스트
    getSolutionList: () => ['/api/slutn/list'],
    //솔루션 메뉴 리스트
    getSolutionMenuList: (requsetData: string) => [`/api/slutn/list/byslutn?slutnId=${requsetData}`],
    //솔루션 상세
    getSolutionDetail: (id: string | null) => [`/api/slutn?slutnId=${id}`],
    //솔루션 메뉴 상세
    getMenuDetail: (id: string | null) => [`/api/slutn?slutnId=${id}`],
    //솔루션 추가
    insertSolution: () => ['/api/slutn'],
    //솔루션 메뉴 추가
    insertMenu: () => ['/api/slutn'],
    //솔루션 수정
    updateSolution: () => ['/api/slutn'],
    //솔루션 메뉴 수정
    updateMenu: () => ['/api/slutn'],
    //솔루션 삭제
    deleteSolution: () => ['/api/slutn/remove'],
    //솔루션 메뉴 삭제
    deleteMenu: () => ['/api/slutn/remove'],
    //솔루션 순서 변경
    reorderSolution: () => ['/api/slutn/listord'],
};

//솔루션 리스트 조회
export const useSolutionList = () => {
    return useQuery({
        queryKey: KEY.getSolutionList(),
        queryFn: async () => {
            return await API.getSolutionList();
        }
    });
};

//솔루션 메뉴 리스트
export const useSolutionMenuList = (requsetData: string) => {
    console.log("실행됨", requsetData);
    return useQuery({
        queryKey: KEY.getSolutionMenuList(requsetData),
        queryFn: async () => {
            return await API.getSolutionMenuList(requsetData);
        }
    });
};

//솔루션 상세
export const useSolutionDetail = (id: string | null) => {
    return useQuery({
        queryKey: KEY.getSolutionDetail(id),
        queryFn: async () => {
            const result = await API.getSolutionDetail(id);
            return result;
        },
        enabled: !!id,
    })
};

//솔루션 메뉴 상세
export const useMenuDetail = (id: string | null) => {
    return useQuery({
        queryKey: KEY.getMenuDetail(id),
        queryFn: async () => {
            const result = await API.getMenuDetail(id);
            return result;
        },
        enabled: !!id,
    })
};

//솔루션 추가
export const insertSolution = (requstData: { body: insertSolutionType }) => {
    return useMutation({
        mutationFn: API.insertSolution,
        mutationKey: KEY.insertSolution(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//솔루션 메뉴 추가
export const insertMenu = (requestData: { body: insertMenuType }) => {
    return useMutation({
        mutationFn: API.insertMenu,
        mutationKey: KEY.insertMenu(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
}

//솔루션 수정
export const updateSolution = (requstData: { body: updateSolutionType }) => {
    return useMutation({
        mutationFn: API.updateSolution,
        mutationKey: KEY.updateSolution(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//솔루션 메뉴 수정
export const updateMenu = (requstData: { body: updateMenuDetailType }) => {
    return useMutation({
        mutationFn: API.updateMenu,
        mutationKey: KEY.updateMenu(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//솔루션 삭제
export const deleteSolution = () => {
    return useMutation({
        mutationFn: (requstData: { body: deleteSolutionType }) => API.deleteSolution(requstData),
        mutationKey: KEY.deleteSolution(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
}

//솔루션 메뉴 삭제
export const deleteMenu = () => {
    return useMutation({
        mutationFn: (requstData: { body: deleteMenuType }) => API.deleteMenu(requstData),
        mutationKey: KEY.deleteMenu(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//솔루션 순서 변경
export const reorderSolution = () => {
    return useMutation({
        mutationFn: (requestData : {body : ReorderSolutionListType}) => API.reorderSolution(requestData),
        mutationKey: KEY.reorderSolution(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
}