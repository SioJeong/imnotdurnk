import * as St from './InformationMessage.style.js';

const InformationMessage = ({ email }) => {
    return (
        <St.InformationContainer>
            <St.StyledH2>이메일을 인증하세요.</St.StyledH2>
            <St.StyledMessage>
                입력하신 {email}로 <br />
                인증코드를 보냈습니다.
            </St.StyledMessage>
            <St.StyledMessage>
                아래에 인증코드를 입력하시고 회원가입을 마치세요.
            </St.StyledMessage>
        </St.InformationContainer>
    );
};

export default InformationMessage;
