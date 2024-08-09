import Swal from 'sweetalert2';
import './alert.css';

// NOTE: 사용 예시 하단에 첨부 해 두었습니다 ! 하나씩 주석 풀고 확인 가능

// 1. ToastAlert (Success / Warning / Error 3가지 타입)
const createToast = (message, icon, customClass, hasNavigation) => {
    const paddingClass = hasNavigation
        ? 'pt-with-navigation'
        : 'pt-without-navigation';

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        customClass: customClass,
        didOpen: (toast) => {
            toast.parentNode.classList.add(paddingClass); // 부모 노드에 paddingClass 추가

            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    Toast.fire({
        icon: icon,
        title: message,
    });
};

// ToastAlert 위치 : 기본적으로 Navigation 있는 상태(true)를 default로 설정
const ToastSuccess = (message, hasNavigation = true) => {
    createToast(message, 'success', 'toast-success', hasNavigation);
};

const ToastWarning = (message, hasNavigation = true) => {
    createToast(message, 'warning', 'toast-warning', hasNavigation);
};

const ToastError = (message, hasNavigation = true) => {
    createToast(message, 'error', 'toast-error', hasNavigation);
};

// 2. ConfirmModal (Delete / Info 2가지 타입 - button 색상 차이 ? 삭제는 red, 인포는 blue)
const createConfirmModal = (
    title,
    confirmButtonText,
    cancelButtonText,
    confirmCallback,
    cancelCallback,
    titleAfterConfirm,
    reverseButtons,
    customClass,
) => {
    const Modal = Swal.mixin({
        buttonsStyling: true,
        customClass: customClass,
    });

    Modal.fire({
        title: title,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        showCancelButton: true,
        reverseButtons: reverseButtons,
    }).then(async (result) => {
        if (result.isConfirmed) {
            const success = await confirmCallback();
            if (success) {
                Modal.fire({
                    title: titleAfterConfirm,
                });
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            cancelCallback();
        }
    });
};

const DeleteConfirmModal = (
    title,
    confirmButtonText = '삭제',
    cancelButtonText = '취소',
    confirmCallback = () => {},
    cancelCallback = () => {},
    titleAfterConfirm,
    reverseButtons = true,
) => {
    createConfirmModal(
        title,
        confirmButtonText,
        cancelButtonText,
        confirmCallback,
        cancelCallback,
        titleAfterConfirm,
        reverseButtons,
        {
            popup: 'delete-popup-class',
            confirmButton: 'delete-confirm-button-class',
            cancelButton: 'delete-cancel-button-class',
        },
    );
};

const InfoConfirmModal = (
    title,
    confirmButtonText = '확인',
    cancelButtonText = '취소',
    confirmCallback = () => {},
    cancelCallback = () => {},
    titleAfterConfirm,
    reverseButtons = false,
) => {
    createConfirmModal(
        title,
        confirmButtonText,
        cancelButtonText,
        confirmCallback,
        cancelCallback,
        titleAfterConfirm,
        reverseButtons,
        {
            popup: 'info-popup-class',
            confirmButton: 'info-confirm-button-class',
            cancelButton: 'info-cancel-button-class',
        },
    );
};

// 사용 예시
// ToastError('이메일 전송에 실패하였습니다.', true);
// ToastWarning('제목을 입력해야 합니다.', false);
// ToastSuccess('일정이 등록되었습니다!', true);

// DeleteConfirmModal(
//     '일정을 삭제 하시겠습니까?',
//     '삭제',
//     '취소',
//     () => {
//         // 컨펌 시 수행 할 동작
//     },
//     () => {
//         // 취소 시 수행 할 동작
//     },
//     '일정이 삭제 되었습니다.',
// );

// InfoConfirmModal(
//     '게임 기록을 일정에 등록하시겠습니까?',
//     '예',
//     '아니오',
//     () => {
//         // 컨펌 시 수행 할 동작
//     },
//     () => {
//         // 취소 시 수행 할 동작
//     },
//     '게임 기록이 등록 되었습니다.',
// );

export {
    DeleteConfirmModal,
    InfoConfirmModal,
    ToastError,
    ToastSuccess,
    ToastWarning,
};
