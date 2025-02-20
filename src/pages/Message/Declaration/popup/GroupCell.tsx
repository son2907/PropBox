import { Stack, Typography } from "@mui/material";
import CenteredBox from "../../../../components/Box/CenteredBox";
import BasicInput from "../../../../components/Input/BasicInput";
import { BasicButton } from "../../../../components/Button";
import BasicTable from "../../../../components/Table/BasicTable";
import { tableTestData } from "../../../../utils/testData";
import TableBox from "../../../../components/Box/TableBox";
import {
  useDeleteKccGroup,
  useGetKccGroupList,
  usePostKccGroup,
  usePutKccGroup,
} from "../../../../api/kcc";
import { useForm } from "react-hook-form";
import { useSptStore } from "../../../../stores/sptStore";
import { useApiRes } from "../../../../utils/useApiRes";
import useModal from "../../../../hooks/useModal";
import { BasicCompletedModl } from "../../../../components/layout/modal/BasicCompletedModl";
import { DeleteModal } from "./Modal/DeleteModatl";
import { DeleteCompleteModal } from "./Modal/DeleteCompleteModal";

export default function GroupCell() {
  const defaultValues = {
    groupNm: "",
  };

  const { register, reset, getValues } = useForm({
    defaultValues: defaultValues,
  });

  const { sptNo } = useSptStore();
  const checkApiFail = useApiRes();
  const { openModal, closeModal } = useModal();

  // 데이터 불러오기
  const { data, refetch } = useGetKccGroupList();

  // 등록
  const { mutate: postGroup } = usePostKccGroup();
  const onPost = () => {
    postGroup(
      {
        body: {
          groupNm: getValues("groupNm"),
          sptNo: sptNo,
        },
      },
      {
        onSuccess: (res) => {
          console.log("업로드 결과:", res);
          const result = checkApiFail(res);
          if (result.data.message === "SUCCESS") {
            console.log("업로드 성공:", res);
            openModal(BasicCompletedModl, {
              modalId: "excelComplete",
              stack: false,
              onClose: () => closeModal,
            });
            refetch();
          }
        },
      }
    );
  };

  // 수정
  // TODO 실제로 수정이 필요한지 확인 필요
  // const { mutate: putGroup } = usePutKccGroup();

  // 삭제
  const { mutate: deleteGroup } = useDeleteKccGroup();
  const onDelete = ({
    groupNo,
    groupNm,
  }: {
    groupNo: string;
    groupNm: string;
  }) => {
    openModal(DeleteModal, {
      name: groupNm,
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        deleteGroup(
          {
            groupNo: groupNo,
          },
          {
            onSuccess: (res) => {
              console.log("삭제 결과:", res);
              const result = checkApiFail(res);
              if (result.data.message === "SUCCESS") {
                console.log("삭제 성공:", res);
                openModal(DeleteCompleteModal, {
                  stack: false,
                  onClose: () => closeModal,
                });
                refetch();
              }
            },
          }
        );
      },
    });
  };

  // 새로고침

  const onClickRefresh = () => {
    reset({ ...defaultValues });
  };

  return (
    <Stack width={"100%"} height={"100%"} bgcolor={"primary.light"}>
      <CenteredBox height={"60px"} gap={1} padding={2} marginTop={1}>
        <Typography>그룹명</Typography>
        <BasicInput {...register("groupNm")} />
        <BasicButton sx={{ marginLeft: "auto" }} onClick={onClickRefresh}>
          새로고침
        </BasicButton>
        <BasicButton onClick={onPost}>저장</BasicButton>
      </CenteredBox>
      <TableBox padding={1}>
        <TableBox.Inner>
          <BasicTable data={tableTestData}>
            <BasicTable.Th>방통위 그룹</BasicTable.Th>
            <BasicTable.Th>삭제</BasicTable.Th>

            <BasicTable.Tbody>
              {data?.data?.contents?.map((item, index) => {
                return (
                  <BasicTable.Tr key={index}>
                    <BasicTable.Td>{item.groupNm}</BasicTable.Td>
                    <BasicTable.Td>
                      <BasicButton
                        onClick={() => {
                          onDelete({
                            groupNo: item.groupNo,
                            groupNm: item.groupNm,
                          });
                        }}
                        sx={{
                          borderColor: "error.main",
                        }}
                      >
                        삭제
                      </BasicButton>
                    </BasicTable.Td>
                  </BasicTable.Tr>
                );
              })}
            </BasicTable.Tbody>
          </BasicTable>
        </TableBox.Inner>
      </TableBox>
    </Stack>
  );
}
