import CustomAlert from "../../../../components/Alert/CustomAlert";
import BlackButton from "../../../../components/Button/BlackButton";
import ModalBox from "../../../../components/Modal";

export const ExcelAlert = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalBox>
      <CustomAlert onClose={onClose}>
        <CustomAlert.Title color="error.main">
          선택된 데이터 없음
        </CustomAlert.Title>
        <CustomAlert.Content color="error.main">
          하나 이상의 데이터를 선택해야 해당 엑셀을 다운로드 할 수 있습니다.
        </CustomAlert.Content>
        <CustomAlert.ButtonZone>
          <BlackButton onClick={onClose} variant="contained" fullWidth>
            닫기
          </BlackButton>
        </CustomAlert.ButtonZone>
      </CustomAlert>
    </ModalBox>
  );
};
