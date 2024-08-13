import Button from '@/components/_button/Button';
import Modal from '@/components/_modal/Modal';
import { icons } from '@/shared/constants/icons';
import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useNavigate } from 'react-router-dom';
import useModalStore from '../../stores/useModalStore';
import { ToastWarning } from '../_common/alert';
import ModalTextBox from '../_modal/ModalTextBox';
import * as St from './MemorizeGame.style';
// 게임 로직
////// 준비 과정
// 0. 이미지 랜덤 배치
// 1. 모달 닫기
//2. 게임 시작 true로 바꾸기
// 3. 카드 뒤집어서 5초간 뒷면 보여주기
// 4. 모두 앞면으로 뒤집기
// 5. 1초후 새로운 타이머 가동
////// 게임 과정
// 6. 첫번째 선택, 두번째 선택 고르기
// 6.1만약 같으면 isMatched = true
// 6.2 matchedPaires +=2
// 6.3 이미 isMatched된 카드는 isFlipped안되게 바꾸기
////// 게임 끝난 후
// 7. timer 시간 초과 or 제출하기 버튼을 눌렀을 때
// 8. 맞춘 카드 쌍의 수 * 16 = 총 점수 (만약 6쌍을 맞췄으면 100점 줌)

const MemorizeGame = () => {
    const { openModal, closeModal } = useModalStore();
    const modalId = 'memorizeGameNoticeModal';
    const navigate = useNavigate();
    const notRandomCardList = [
        { id: 0, imageName: 'chicken', isFlipped: false, isMatched: false },
        { id: 1, imageName: 'chicken', isFlipped: false, isMatched: false },
        { id: 2, imageName: 'heart', isFlipped: false, isMatched: false },
        { id: 3, imageName: 'heart', isFlipped: false, isMatched: false },
        { id: 4, imageName: 'nauseated', isFlipped: false, isMatched: false },
        { id: 5, imageName: 'nauseated', isFlipped: false, isMatched: false },
        { id: 6, imageName: 'wine', isFlipped: false, isMatched: false },
        { id: 7, imageName: 'wine', isFlipped: false, isMatched: false },
        { id: 8, imageName: 'woozy', isFlipped: false, isMatched: false },
        { id: 9, imageName: 'woozy', isFlipped: false, isMatched: false },
        { id: 10, imageName: 'zanny', isFlipped: false, isMatched: false },
        { id: 11, imageName: 'zanny', isFlipped: false, isMatched: false },
    ];
    const [isVisible, setIsVisible] = useState(false);
    const [isGameStarted2, setIsGameStarted2] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false); //게임 시작
    const [cardList, setCardList] = useState(notRandomCardList);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [matchedPairs, setMatchedPairs] = useState(0); // 맞춘 쌍의 횟수
    const [isClickDisabled, setIsClickDisabled] = useState(false); // 카드 클릭 비활성화 상태
    //타이머 조절용 변수 0 -> 5초 카운터 1 -> 30초 카운터
    const [activeTimer, setActiveTimer] = useState(0);
    const check = () => {
        console.log('check함수 내 제발 보여라ㅏㅏ', firstCard, secondCard);
    };
    const handleCardClick = (id) => {
        if (isClickDisabled || isGameOver) {
            //5초 & 게임 오버일 땐 건들 ㄴ
            return;
        }

        const clickedCard = cardList.find((card) => card.id === id);

        // 이미 매칭된 카드나 뒤집혀 있는 카드라면 리턴
        if (clickedCard.isMatched || clickedCard.isFlipped) {
            return;
        }

        // 카드 뒤집기
        setCardList((prevCardList) =>
            prevCardList.map((card) =>
                card.id === id ? { ...card, isFlipped: true } : card,
            ),
        );

        // 첫번째 카드가 선택안되어있으면 -> 지금 고른게 첫 번째 카드
        if (!firstCard) {
            setFirstCard(clickedCard);
            return;
        }

        // 두 번째 카드 선택
        setSecondCard(clickedCard);
        setIsClickDisabled(true);
    };

    // 0. 카드 랜덤 생성
    // TODO : 게임용 이미지 추가, 지금은 그냥 아이콘에 있는 이미지명 사용함
    const shuffleArray = (array) => {
        //Fisher-Yates Shuffle
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        console.log('shuffleArray', array);
        return array;
    };

    // 1. 모달 닫기 2. 게임 시작 isFlipped= truel로 바꾸기 3. 타이머 시작
    const closeHandler = () => {
        closeModal(modalId);
        //setIsGameStarted(true);
        setIsVisible(true);
        setCardList((prevCardList) =>
            prevCardList.map((card) => ({ ...card, isFlipped: true })),
        );
        setIsClickDisabled(true);
        setIsGameStarted(true);
    };
    //4.모두 앞면으로 뒤집기 & 카드 비활성화 풀기
    const handleFinishShowCardImage = () => {
        setCardList((prevCardList) =>
            prevCardList.map((card) => ({ ...card, isFlipped: false })),
        );
        setIsClickDisabled(false);
        setActiveTimer(1);
        setIsGameStarted2(true);

        return { shouldRepeat: true, delay: 1.5 };
    };

    //점수 계산 함수
    const calculateGameScore = () => {
        let gameScore = matchedPairs === 6 ? 100 : matchedPairs * 16;
        return gameScore;
    };
    //게임 끝났을 때 함수
    const handleFinishGame = async () => {
        ToastWarning('게임 끝', true);
        const gameScore = await calculateGameScore();
        console.log('gameScore', gameScore);
        // 게임 결과 페이지로 이동
        navigate('/game/game-result', {
            state: {
                gameName: '기억력',
                gameScore: gameScore,
            },
        });
    };

    //0.카드 랜덤 생성
    useEffect(() => {
        const shffleResult = shuffleArray(notRandomCardList);
        setCardList(shffleResult);
    }, []);
    useEffect(() => {
        console.log('Opening modal');
        openModal(modalId);
    }, [openModal, modalId]); // modalId를 의존성 배열에 추가

    useEffect(() => {
        setTimeout(() => {
            if (matchedPairs === cardList.length / 2) {
                // 모든 카드 쌍이 매칭되었을 때
                setIsGameOver(true);
                handleFinishGame();
            }
        }, 2000);
    }, [matchedPairs]);
    useEffect(() => {
        if (!firstCard || !secondCard) {
            return;
        }
        console.log('useEffect', firstCard, secondCard);
        if (firstCard.imageName === secondCard.imageName) {
            //isMatched === true로 변경
            console.log('맞');
            setCardList((prevCardList) =>
                prevCardList.map((card) =>
                    card.id === firstCard.id || card.id === secondCard.id
                        ? { ...card, isMatched: true }
                        : card,
                ),
            );
            setMatchedPairs(matchedPairs + 1);
            setFirstCard(null);
            setSecondCard(null);
            setIsClickDisabled(false);
        } else {
            console.log('틀');
            //isFlipped === false로 변경
            setTimeout(() => {
                setCardList((prevCardList) =>
                    prevCardList.map((card) =>
                        card.id === firstCard.id || card.id === secondCard.id
                            ? { ...card, isFlipped: false }
                            : card,
                    ),
                );
                setFirstCard(null);
                setSecondCard(null);
                setTimeout(() => setIsClickDisabled(false), 20);
            }, 1000);
        }
    }, [secondCard]);

    return (
        <St.TypingGameContainer>
            <St.TitleContainer>
                <St.Title>카드의 뒷면을 기억해보세요!</St.Title>
                <St.SubTitle>
                    카드의 뒷면을 5초간 보여드릴 테니 <br /> 카드를 다시 뒤집은
                    후, 카드 쌍을 맞춰보세요.
                </St.SubTitle>
            </St.TitleContainer>
            <St.TimerBox>
                <CountdownCircleTimer
                    duration={activeTimer === 0 ? 3 : 35}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={
                        activeTimer === 0 ? [5, 3, 2, 0] : [30, 15, 5, 0]
                    }
                    size={50}
                    strokeWidth={5}
                    isSmoothColorTransition={true}
                    isPlaying={
                        activeTimer === 0 ? isGameStarted : isGameStarted2
                    }
                    onComplete={
                        activeTimer === 0
                            ? handleFinishShowCardImage
                            : handleFinishGame
                    }
                >
                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
            </St.TimerBox>
            <St.TestDiv $isVisible={isVisible}>
                {cardList.map((card) => (
                    <St.Card
                        key={card.id}
                        id={card.id}
                        value={card.value}
                        isFlipped={card.isFlipped || card.isMatched}
                        onClick={() => handleCardClick(card.id)}
                    >
                        {' '}
                        <St.CardInner isFlipped={card.isFlipped}>
                            <St.CardFront />
                            <St.CardBack>
                                <St.CardImage
                                    src={icons[card.imageName]}
                                    alt={card.imageName}
                                />
                            </St.CardBack>{' '}
                        </St.CardInner>
                    </St.Card>
                ))}
            </St.TestDiv>

            <St.ButtonBox>
                <Button
                    text="제출하기"
                    size="large"
                    isRed={true}
                    onClick={handleFinishGame}
                />
            </St.ButtonBox>
            <Modal
                isForGame
                modalId="memorizeGameNoticeModal"
                contents={
                    <ModalTextBox text="30초 안에 같은 그림의 카드를 찾으세요!" />
                }
                buttonText={'시작하기'}
                onButtonClick={closeHandler}
            />
        </St.TypingGameContainer>
    );
};

export default MemorizeGame;
