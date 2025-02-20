import CustomAlert from "../../Alert/CustomAlert";
import { BasicButton } from "../../Button";

export const FailModal = ({
  onClose,
  message,
}: {
  onClose: () => void;
  modalId: string;
  message?: string;
}) => {
  return (
    <CustomAlert onClose={onClose}>
      <CustomAlert.Title color="error.main">요청 실패</CustomAlert.Title>
      <CustomAlert.Content>요청에 실패하였습니다.</CustomAlert.Content>
      <CustomAlert.Content>
        {message ?? "시스템 관리자에게 문의해주십시오."}
      </CustomAlert.Content>
      <CustomAlert.ButtonZone>
        <BasicButton onClick={onClose} variant="contained">
          닫기
        </BasicButton>
      </CustomAlert.ButtonZone>
    </CustomAlert>
  );
};
