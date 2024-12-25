import CustomAlert from "../../Alert/CustomAlert";
import BlackButton from "../../Button/BlackButton";
import { BasicButton } from "../../Button";

export const ConfirmDeleteModal = ({
    onClose,
    onSubmit,
}: {
    onClose: () => void;
    onSubmit: () => void;
    modalId: string;
}) => {
    return (
        <CustomAlert onClose={onClose}>
            <CustomAlert.Title>공지사항 삭제</CustomAlert.Title>
            <CustomAlert.Content>공지사항을 삭제하시겠습니까?</CustomAlert.Content>
            <CustomAlert.ButtonZone>
                <BlackButton onClick={onSubmit} variant="outlined">
                    예
                </BlackButton>
                <BasicButton onClick={onClose} variant="contained">
                    아니오
                </BasicButton>
            </CustomAlert.ButtonZone>
        </CustomAlert>
    )
}