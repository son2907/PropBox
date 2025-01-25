import CustomAlert from "../../../components/Alert/CustomAlert";
import BlackButton from "../../../components/Button/BlackButton";

export const DisconnectedModal = ({
  onClose,
}: {
  onClose: () => void;
  modalId: string;
}) => {
  return (
    <CustomAlert onClose={onClose}>
      <CustomAlert.Title color="error.main">
        타 PC에서 로그인을 시도하여, 전화기 연결이 끊겼습니다.
      </CustomAlert.Title>
      <CustomAlert.ButtonZone>
        <BlackButton onClick={onClose} variant="outlined">
          확인
        </BlackButton>
      </CustomAlert.ButtonZone>
    </CustomAlert>
  );
};
