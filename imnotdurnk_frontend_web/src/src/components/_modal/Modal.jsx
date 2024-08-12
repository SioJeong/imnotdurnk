import Button from '@/components/_button/Button';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import useModalStore from '../../stores/useModalStore';
import * as St from './Modal.style';

const Modal = ({
    modalId,
    contents,
    buttonText,
    onButtonClick,
    customCloseModal,
}) => {
    // modals, closeModal 변경 시에만 리렌더링 (성능 최적화)
    const { modals, closeModal } = useStoreWithEqualityFn(
        useModalStore,
        (state) => ({
            modals: state.modals,
            closeModal: state.closeModal,
        }),
    );

    const isModalOpened = modals[modalId] || false; // 기본값 false

    const closeModalByBackground = () => {
        if (customCloseModal) {
            customCloseModal(modalId);
        }
        closeModal(modalId);
    };

    return (
        <>
            {isModalOpened && (
                <St.ModalBackground onClick={closeModalByBackground}>
                    <St.ModalContainer onClick={(e) => e.stopPropagation()}>
                        <img src="/src/assets/images/bezel.svg" alt="Bezel" />
                        <div>{contents}</div>
                        <Button
                            text={buttonText}
                            size={'large'}
                            isRed={true}
                            onClick={() => onButtonClick(modalId)}
                        />
                    </St.ModalContainer>
                </St.ModalBackground>
            )}
        </>
    );
};

export default Modal;
