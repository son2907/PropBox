import CustomAlert from "../../../../../components/Alert/CustomAlert";
import { BasicButton } from "../../../../../components/Button";
import BlackButton from "../../../../../components/Button/BlackButton";

export const DeleteModal = ({
  onClose,
  onSubmit,
  name,
}: {
  onClose: () => void;
  onSubmit: () => void;
  name: string;
}) => {
  return (
    <CustomAlert onClose={onClose}>
      <CustomAlert.Title color="error.main">
        {name}을 삭제합니다.
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
