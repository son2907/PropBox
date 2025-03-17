import CustomAlert from "../../../../components/Alert/CustomAlert";
import { BasicButton } from "../../../../components/Button";
import BlackButton from "../../../../components/Button/BlackButton";

export const SendMsgConfirm = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
  modalId: string;
}) => {
  return (
    <CustomAlert onClose={onClose}>
      <CustomAlert.Title>문자 발송을 하시겠습니까?</CustomAlert.Title>
      <CustomAlert.ButtonZone>
        <BlackButton onClick={onSubmit}>예</BlackButton>
        <BasicButton onClick={onClose} variant="contained">
          아니오
        </BasicButton>
      </CustomAlert.ButtonZone>
    </CustomAlert>
  );
};
