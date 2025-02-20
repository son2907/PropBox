import CustomAlert from "../../Alert/CustomAlert";
import { BasicButton } from "../../Button";
import BlackButton from "../../Button/BlackButton";

export const LogoutModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
  modalId: string;
}) => {
  return (
    <CustomAlert onClose={onClose}>
      <CustomAlert.Title color="error.main">로그아웃</CustomAlert.Title>
      <CustomAlert.Content>로그아웃 하시겠습니까?</CustomAlert.Content>
      <CustomAlert.Content>
        저장하지 않은 정보는 지워지게 됩니다.
      </CustomAlert.Content>
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
