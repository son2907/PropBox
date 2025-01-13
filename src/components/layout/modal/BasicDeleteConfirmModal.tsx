import CustomAlert from "../../Alert/CustomAlert";
import BlackButton from "../../Button/BlackButton";
import { BasicButton } from "../../Button";

export const BasicDeleteConfirmModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
  modalId: string;
}) => {
  return (
    <CustomAlert onClose={onClose}>
      <CustomAlert.Title color="error.main">
        등록 정보가 삭제됩니다.
      </CustomAlert.Title>
      <CustomAlert.Content color="error.main">
        삭제 하시겠습니까?
      </CustomAlert.Content>
      <CustomAlert.ButtonZone>
        <BlackButton onClick={onSubmit} variant="outlined" fullWidth>
          예
        </BlackButton>
        <BasicButton onClick={onClose} variant="contained" fullWidth>
          아니오
        </BasicButton>
      </CustomAlert.ButtonZone>
    </CustomAlert>
  );
};
