import CustomAlert from "../../../../../components/Alert/CustomAlert";
import BlackButton from "../../../../../components/Button/BlackButton";
import ModalBox from "../../../../../components/Modal";

export const AlertModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalBox>
      <CustomAlert onClose={onClose}>
        <CustomAlert.Title>선택된 데이터가 없습니다.</CustomAlert.Title>
        <CustomAlert.ButtonZone>
          <BlackButton onClick={onClose} variant="outlined" fullWidth>
            닫기
          </BlackButton>
        </CustomAlert.ButtonZone>
      </CustomAlert>
    </ModalBox>
  );
};
