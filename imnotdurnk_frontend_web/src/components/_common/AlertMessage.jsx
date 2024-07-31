import * as St from './AlertMessage.style';
const AlertMessage = ({ message, size }) => {
    return <St.StyledMessage $size={size}>{message}</St.StyledMessage>;
};
export default AlertMessage;
