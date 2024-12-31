import CustomAlert from "../../Alert/CustomAlert";
import { BasicButton } from "../../Button";
import BlackButton from "../../Button/BlackButton";

export const ConfirmMultipleDeletionModal = ({
    onClose,
    onSubmit,
    itemCount,
}: {
    onClose: () => void;
    onSubmit: () => void;
    modalId: string;
    itemCount: number;
}) => {
    return (
        <CustomAlert onClose={onClose}>
            <CustomAlert.Title color="error.main">선택 내용 {itemCount}건이 삭제 됩니다.</CustomAlert.Title>
            <CustomAlert.Content color="error.main">삭제하시겠습니까?</CustomAlert.Content>
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
}