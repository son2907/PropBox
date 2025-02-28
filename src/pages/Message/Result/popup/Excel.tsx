import CustomAlert from "../../../../components/Alert/CustomAlert";
import { BasicButton } from "../../../../components/Button";
import ModalBox from "../../../../components/Modal";

export const Excel = ({
  onResult,
  onDetail,
  onClose,
}: {
  onResult: () => void;
  onDetail: () => void;
  onClose: () => void;
}) => {
  return (
    <ModalBox>
      <CustomAlert onClose={onClose}>
        <CustomAlert.Title>저장할 엑셀을 선택해주세요.</CustomAlert.Title>
        <CustomAlert.Content>
          엑셀로 저장할 부분을 선택해주세요.
        </CustomAlert.Content>
        <CustomAlert.ButtonZone>
          <BasicButton onClick={onResult} variant="outlined" fullWidth>
            전송그룹별 엑셀 저장
          </BasicButton>
          <BasicButton onClick={onDetail} variant="outlined" fullWidth>
            전송시간별 엑셀 저장
          </BasicButton>
        </CustomAlert.ButtonZone>
      </CustomAlert>
    </ModalBox>
  );
};
