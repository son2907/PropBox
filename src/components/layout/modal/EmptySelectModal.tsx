import CustomAlert from "../../Alert/CustomAlert";
import BlackButton from "../../Button/BlackButton";

export const EmptySelectModal = ({
    onClose,
    onSubmit,
}: {
    onClose: () => void;
    onSubmit: () => void;
    modalId: string;
}) => {
    return (
        <CustomAlert onClose={onClose}>
            <CustomAlert.Title>선택된 데이터가 없습니다.</CustomAlert.Title>
            <CustomAlert.Content></CustomAlert.Content>
            <CustomAlert.ButtonZone>
                <BlackButton onClick={onSubmit} variant="outlined">
                    예
                </BlackButton>
            </CustomAlert.ButtonZone>
        </CustomAlert>
    );
}