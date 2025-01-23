import CustomAlert from "../../Alert/CustomAlert";
import { BasicButton } from "../../Button";

export const FileModal = ({
  onClose,
}: {
  onClose: () => void;
  modalId: string;
}) => {
  return (
    <CustomAlert onClose={onClose}>
      <CustomAlert.Title color="error.main">업로드 제한</CustomAlert.Title>
      <CustomAlert.Content>
        파일은 세 개 까지만 업로드 할 수 있습니다.
      </CustomAlert.Content>
      <CustomAlert.ButtonZone>
        <BasicButton onClick={onClose} variant="contained">
          닫기
        </BasicButton>
      </CustomAlert.ButtonZone>
    </CustomAlert>
  );
};
