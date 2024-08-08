import Swal from 'sweetalert2';
import './alert.css';

// NOTE: 사용 예시
// ToastError('이메일 전송에 실패하였습니다.', true);
// ToastWarning('제목을 입력해야 합니다.', false);
// ToastSuccess('일정이 등록되었습니다!', true);

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

export { ToastError, ToastSuccess, ToastWarning };
