import CustomAlert from "../../Alert/CustomAlert";
import BlackButton from "../../Button/BlackButton";
import { BasicButton } from "../../Button";

export const MultipleDeleteModal = ({
  number,
  onClose,
  onSubmit,
}: {
  number: number;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return (
    <CustomAlert onClose={onClose}>
      <CustomAlert.Title>
        선택된 내용 {number} 건이 삭제됩니다.
      </CustomAlert.Title>
      <CustomAlert.Content>삭제하시겠습니까?</CustomAlert.Content>
      <CustomAlert.ButtonZone>
        <BlackButton onClick={onSubmit} variant="outlined">
          예
        </BlackButton>
        <BasicButton onClick={onClose} variant="contained">
          아니오
        </BasicButton>
      </CustomAlert.ButtonZone>
    </CustomAlert>
  );
};
