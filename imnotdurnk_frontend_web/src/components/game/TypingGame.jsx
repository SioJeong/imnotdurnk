import Button from '@/components/_button/Button';
import Modal from '@/components/_modal/Modal';
import useUserStore from '@/stores/useUserStore.js';
import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { getTestSentence } from '../../services/game';
import useModalStore from '../../stores/useModalStore';
import { ToastWarning } from '../_common/alert';
import ModalTextBox from '../_modal/ModalTextBox';
import * as St from './TypingGame.style';
const TypingGame = () => {
    const { user } = useUserStore((state) => ({
        user: state.user,
    }));
    const { openModal, closeModal } = useModalStore();
    const modalId = 'typingGameNoticeModal';
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const closeHandler = (state) => {
        closeModal(modalId);
        setIsVisible(true);
        setIsGameStarted(true);
    };
    const [testText, setTestText] = useState('');
    //const testText = '달나라에서 온 토끼가 땅콩버터를 좋아한다는 소문이 있다.';

    const [inputTyping, setInputTyping] = useState('');
    const handleInputChange = (e) => {
        setInputTyping(e.target.value);
        console.log(
            inputTyping[inputTyping.length - 1],
            testText[inputTyping.length - 1],
        );
    };
    const getStyledText = () => {
        const typedChars = inputTyping.split(''); // 입력된 문자 배열
        const testChars = testText.split(''); // 주어진 문자 배열

        return testChars.map((char, index) => {
            const typedChar = typedChars[index] || ''; // 입력된 문자가 부족할 경우 빈 문자열

            const isMatch = typedChar === char;
            const isSpace = testChars[index] === ' ';
            const isPast = index < typedChars.length;

            let color = 'var(--color-green3)'; // 기본 색상
            if (isPast) {
                if (isMatch) {
                    color = 'var(--color-green1)'; // 맞는 글자
                } else {
                    color = 'var( --color-red)'; // 틀린 글자
                }
            }
            return (
                <St.StyledSpan
                    key={index}
                    $isSpace={isSpace}
                    $isPast={isPast}
                    $color={color}
                >
                    {char}
                </St.StyledSpan>
            );
        });
    };
    const onClickRemoveButton = () => {
        setInputTyping('');
    };
    const calculateGameScore = () => {
        // e.prventDefault();
        const testTextArray = testText.split('');
        const inputTextArray = inputTyping.split('');

        let matchCount = 0;

        // 공백도 포함해서 문자 비교
        for (let i = 0; i < testTextArray.length; i++) {
            if (inputTextArray[i] === testTextArray[i]) {
                matchCount++;
            }
        }
        // setInputTyping('');
        console.log(
            `일치하는 문자 수: ${matchCount} 전체 문자수 : `,
            testTextArray.length,
        );
    };
    const handleTimeOut = () => {
        ToastWarning('시간 끝', true);

        calculateGameScore();
        // return { shouldRepeat: true, delay: 1.5 };
    };
    useEffect(() => {
        const getTestText = async () => {
            const getTestTextResult = await getTestSentence();
            setTestText(getTestTextResult);
        };
        getTestText();
        console.log('Opening modal');
        openModal(modalId);
    }, [openModal]);

    return (
        <St.TypingGameContainer>
            <St.TitleContainer>
                <St.Title>아래의 글을 따라 입력해주세요!</St.Title>
                <St.SubTitle>
                    {user.nickname ? user.nickname : user.name}님의 타자를 보고
                    취했는지 판단해드릴게요.
                </St.SubTitle>
            </St.TitleContainer>
            <St.TimerBox>
                {' '}
                <CountdownCircleTimer
                    duration={30}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[30, 15, 10, 0]}
                    size={120}
                    isSmoothColorTransition={true}
                    isPlaying={isGameStarted}
                    onComplete={handleTimeOut}
                >
                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
            </St.TimerBox>
            <St.TestTextDiv $isVisible={isVisible}>
                {' '}
                {getStyledText()}
            </St.TestTextDiv>
            <St.TypingGameInput
                inputType="text"
                value={inputTyping}
                onChange={handleInputChange}
                name="inputTyping"
                autoComplete="off"
            />
            <St.ButtonBox>
                <Button
                    text="다 지우기"
                    size="medium"
                    isRed={false}
                    onClick={onClickRemoveButton}
                />
                <Button
                    text="제출하기"
                    size="medium"
                    isRed={true}
                    onClick={calculateGameScore}
                />
            </St.ButtonBox>
            <Modal
                modalId="typingGameNoticeModal"
                contents={
                    <ModalTextBox text="30초 안에 주어진 문장을 입력하세요!" />
                }
                buttonText={'시작하기'}
                onButtonClick={closeHandler}
            />
        </St.TypingGameContainer>
    );
};

export default TypingGame;
