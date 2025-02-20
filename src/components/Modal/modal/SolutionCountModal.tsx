import CustomAlert from "../../Alert/CustomAlert";
import BlackButton from "../../Button/BlackButton";

export const solutionCountModal = ({
    onClose,
    onSubmit,
}: {
    onClose: () => void;
    onSubmit: () => void;
    modalId: string;
}) => {
    return(
        <CustomAlert onClose={onClose}>
            <CustomAlert.Title>잔여 수량보다 적은 수량은 수정 불가합니다</CustomAlert.Title>
            <CustomAlert.Content></CustomAlert.Content>
            <CustomAlert.ButtonZone>
                <BlackButton onClick={onSubmit} variant="outlined">
                    예
                </BlackButton>
            </CustomAlert.ButtonZone>
        </CustomAlert>
    )
}