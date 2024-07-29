import * as St from './ErrorMessage.style';
const ErrorMessage = ({ message }) => {
    return <St.StyledMessage>{message}</St.StyledMessage>;
};
export default ErrorMessage;
