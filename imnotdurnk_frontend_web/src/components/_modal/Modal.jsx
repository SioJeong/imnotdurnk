import Button from '@/components/_button/Button';
import * as St from './Modal.style';

const Modal = ({
    isModalOpend,
    onClose,
    contents,
    buttonText,
    onButtonClick,
}) => {
    return (
        <>
            {isModalOpend && (
                <St.ModalBackground onClick={onClose}>
                    <St.ModalContainer onClick={(e) => e.stopPropagation()}>
                        <img src="/src/assets/images/bezel.svg" alt="Bezel" />
                        <div>{contents}</div>
                        <Button
                            text={buttonText}
                            size={'large'}
                            isRed={true}
                            onButtonClick={onButtonClick}
                        />
                    </St.ModalContainer>
                </St.ModalBackground>
            )}
        </>
    );
};

export default Modal;
