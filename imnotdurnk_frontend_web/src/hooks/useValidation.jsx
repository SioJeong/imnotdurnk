// // useValidation.js
// import { useCallback, useState } from 'react';

// // 이메일 유효성 검사 훅
// export const useEmailValidation = (initialEmail = '') => {
//     const [email, setEmail] = useState(initialEmail);
//     const [emailError, setEmailError] = useState('');

//     const validateEmail = useCallback((email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }, []);

//     const validate = useCallback(() => {
//         if (!validateEmail(email)) {
//             setEmailError('올바른 이메일 양식이 아닙니다.');
//             return false;
//         } else {
//             setEmailError('');
//             return true;
//         }
//     }, [email, validateEmail]);

//     return {
//         email,
//         setEmail,
//         emailError,
//         validate,
//     };
// };

// // 비밀번호 유효성 검사 훅
// export const usePasswordValidation = (initialPassword = '') => {
//     const [password, setPassword] = useState(initialPassword);
//     const [passwordError, setPasswordError] = useState('');

//     const validatePassword = useCallback((password) => {
//         const passwordRegex =
//             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
//         return passwordRegex.test(password);
//     }, []);

//     const validate = useCallback(() => {
//         if (!validatePassword(password)) {
//             setPasswordError(
//                 '비밀번호는 대문자, 소문자, 숫자를 포함하고 8~16자리여야 합니다.',
//             );
//             return false;
//         } else {
//             setPasswordError('');
//             return true;
//         }
//     }, [password, validatePassword]);

//     return {
//         password,
//         setPassword,
//         passwordError,
//         validate,
//     };
// };
