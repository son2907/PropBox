import CustomAlert from "../../../../components/Alert/CustomAlert";
import BlackButton from "../../../../components/Button/BlackButton";

export const AlertModal = ({
  onClose,
  text,
}: {
  onClose: () => void;
  text: string;
}) => {
  return (
    <CustomAlert onClose={onClose}>
      <CustomAlert.Title>알림</CustomAlert.Title>
      <CustomAlert.Content>{text}</CustomAlert.Content>
      <CustomAlert.ButtonZone>
        <BlackButton onClick={onClose} variant="outlined">
          닫기기
        </BlackButton>
      </CustomAlert.ButtonZone>
    </CustomAlert>
  );
};
