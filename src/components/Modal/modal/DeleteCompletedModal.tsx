import CustomAlert from "../../Alert/CustomAlert";
import BlackButton from "../../Button/BlackButton";

export const DeleteCompletedModal = ({
    onClose,
    onSubmit,
} : {
    onClose: () => void;
    onSubmit: () => void;
    modalId: string;
}) => {
    return (
        <CustomAlert onClose={onClose}>
            <CustomAlert.Title>삭제 완료</CustomAlert.Title>
            <CustomAlert.Content>삭제가 완료되었습니다.</CustomAlert.Content>
            <CustomAlert.ButtonZone>
                <BlackButton onClick={onSubmit} variant="outlined">
                    예
                </BlackButton>
            </CustomAlert.ButtonZone>
        </CustomAlert>
    );
}