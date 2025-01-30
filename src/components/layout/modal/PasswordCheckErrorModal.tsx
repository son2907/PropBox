import CustomAlert from "../../Alert/CustomAlert";
import { BasicButton } from "../../Button";
import BlackButton from "../../Button/BlackButton";

export const PasswordCheckErrorModal = ({
    onClose,
    onSubmit,
} : {
    onClose: () => void;
    onSubmit: () => void;
    modalId: string;
}) => {
    return (
        <CustomAlert onClose={onClose}>
            <CustomAlert.Title>비밀번호 확인</CustomAlert.Title>
            <CustomAlert.Content>비밀번호를 다시 확인해주세요</CustomAlert.Content>
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