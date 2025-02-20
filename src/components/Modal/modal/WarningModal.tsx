import CustomAlert from "../../Alert/CustomAlert";
import BlackButton from "../../Button/BlackButton";

export const WarningModal = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  return (
    <CustomAlert onClose={onClose}>
      <CustomAlert.Title color="error.main">{message}</CustomAlert.Title>
      <CustomAlert.Content></CustomAlert.Content>
      <CustomAlert.ButtonZone>
        <BlackButton onClick={onClose} variant="outlined">
          닫기
        </BlackButton>
      </CustomAlert.ButtonZone>
    </CustomAlert>
  );
};
