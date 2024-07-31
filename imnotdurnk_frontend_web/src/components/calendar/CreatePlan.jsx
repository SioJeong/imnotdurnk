import { calendarMinmax } from '@/shared/constants/minmaxLength';
import { useRef, useState } from 'react';
import { styled } from 'styled-components';
import Modal from '../_modal/Modal';
import ModalDropdown from './../_modal/ModalDropdown';

const CreatePlan = () => {
    const [time, setTime] = useState('오후 06시 00분');
    const [title, setTitle] = useState('');
    const [memo, setMemo] = useState('');

    const [isModalOpend, setIsModalOpend] = useState(false);

    const memoRef = useRef(null);

    const titleMax = calendarMinmax.PLAN_TITLE_MAX_LEN;
    const titleMin = calendarMinmax.PLAN_TITLE_MIN_LEN;
    const memoMax = calendarMinmax.PLAN_MEMO_MAX_LEN;

    const handleTitleLength = (e) => {
        const input = e.target.value;
        if (input.length <= titleMax) {
            setTitle(input);
        }
    };

    const handleMemoLength = (e) => {
        const input = e.target.value;
        if (input.length <= memoMax) {
            setMemo(input);
        }
    };

    const resizeTextarea = (e) => {
        e.target.style.height = 'auto'; // 다시 줄어들 때
        e.target.style.height = `${e.target.scrollHeight}px`; // 늘어날 때
    };

    const handleTime = (ampm, hour, minute) => {
        setTime(`${ampm} ${hour} ${minute}`);
    };

    const handleTimeInput = () => {
        setIsModalOpend(true);
    };

    const handleSave = () => {
        console.log('저장된 시간:', time);
        setIsModalOpend(false);
    };

    return (
        <CreatePlanContainer>
            <h3>일정 정보</h3>
            <PlanContainer>
                <InputItemBox>
                    <img
                        src="/src/assets/icons/size_24/Icon-calendar.svg"
                        alt="date"
                    />
                    {/* 모달 뜨게 */}
                    <h4 onClick={() => alert('날짜 입력')}>2024년 7월 28일</h4>
                </InputItemBox>
                <InputItemBox onClick={handleTimeInput}>
                    <img
                        src="/src/assets/icons/size_24/Icon-clock.svg"
                        alt="time"
                    />
                    <h4>{time}</h4>
                    <Modal
                        isModalOpend={isModalOpend}
                        onClose={() => setIsModalOpend(false)}
                        contents={<ModalDropdown handleTime={handleTime} />}
                        buttonText={'저장하기'}
                        onButtonClick={handleSave}
                    />
                </InputItemBox>
                <InputItemBox>
                    <img
                        src="/src/assets/icons/size_24/Icon-title.svg"
                        alt="title"
                    />
                    <InputTitleText
                        value={title}
                        onChange={handleTitleLength}
                        minLength={titleMin}
                        maxLength={titleMax}
                        placeholder={`최소 ${titleMin} 자 ~ 최대 ${titleMax} 자 입력해야 합니다.`}
                    />
                </InputItemBox>
                <InputItemBox $boxSize="long">
                    <img
                        src="/src/assets/icons/size_24/Icon-memo.svg"
                        alt="memo"
                    />
                    <InputMemoText
                        ref={memoRef}
                        value={memo}
                        onChange={handleMemoLength}
                        rows="5"
                        onInput={resizeTextarea}
                        maxLength={memoMax}
                        placeholder={`최대 ${memoMax} 글자까지 입력할 수 있습니다.`}
                    />
                </InputItemBox>
            </PlanContainer>
        </CreatePlanContainer>
    );
};

export default CreatePlan;

const CreatePlanContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8571rem;

    padding: 1.7143rem;

    border-radius: 20px;
    background-color: var(--color-white2);
`;

const PlanContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.7143rem;
`;

const InputItemBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: ${({ $boxSize }) =>
        $boxSize === 'long' ? 'flex-start' : 'center'};

    padding: ${({ $boxSize }) =>
        $boxSize === 'long' ? '0.7143rem 1.2143rem' : '0.5714rem 1.2143rem'};

    border-radius: 10px;
    background: var(--color-white1, #fff);

    cursor: pointer;
`;

const InputTitleText = styled.input`
    width: 13.7143rem;

    font-weight: 500;
    font-size: var(--font-body-h4);
`;

const InputMemoText = styled.textarea`
    width: 13.7143rem;

    font-weight: 500;
    font-size: var(--font-body-h4);

    /* 스크롤바 숨기기 (크롬, 사파리, 엣지 등 웹킷 브라우저용) */
    &::-webkit-scrollbar {
        display: none;
    }

    /* 스크롤바 숨기기 (파이어폭스용) */
    scrollbar-width: none; /* Firefox */
`;
