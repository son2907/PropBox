import CustomAlert from "../../../../../components/Alert/CustomAlert";
import BlackButton from "../../../../../components/Button/BlackButton";

export const DeleteCompleteModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <CustomAlert onClose={onClose}>
      <CustomAlert.Content>삭제되었습니다.</CustomAlert.Content>
      <CustomAlert.ButtonZone>
        <BlackButton onClick={onClose} variant="outlined" fullWidth>
          예
        </BlackButton>
      </CustomAlert.ButtonZone>
    </CustomAlert>
  );
};
