import Swal from 'sweetalert2';
import './alert.css';

// NOTE: 사용 예시
// ToastError('이메일 전송에 실패하였습니다.');
// ToastWarning('제목을 입력해야 합니다.');
// ToastSuccess('일정이 등록되었습니다!');

const createToast = (message, icon, customClass) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        customClass: customClass,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    Toast.fire({
        icon: icon,
        title: message,
    });
};

const ToastSuccess = (message) => {
    createToast(message, 'success', 'toast-success');
};

const ToastWarning = (message) => {
    createToast(message, 'warning', 'toast-warning');
};

const ToastError = (message) => {
    createToast(message, 'error', 'toast-error');
};

export { ToastError, ToastSuccess, ToastWarning };
