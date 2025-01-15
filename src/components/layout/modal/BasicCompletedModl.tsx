import CustomAlert from "../../Alert/CustomAlert";
import BlackButton from "../../Button/BlackButton";

export const BasicCompletedModl = ({
  onClose,
}: {
  onClose: () => void;
  modalId: string;
}) => {
  return (
    <CustomAlert onClose={onClose}>
      <CustomAlert.Title>요청 작업이 완료되었습니다.</CustomAlert.Title>
      <CustomAlert.Content></CustomAlert.Content>
      <CustomAlert.ButtonZone>
        <BlackButton onClick={onClose} variant="outlined">
          예
        </BlackButton>
      </CustomAlert.ButtonZone>
    </CustomAlert>
  );
};
