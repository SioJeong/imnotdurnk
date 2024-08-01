import { calendarMinmax } from '@/shared/constants/minmaxLength';
import { useEffect, useRef, useState } from 'react';
import useModalStore from '../../stores/useModalStore';
import Modal from '../_modal/Modal';
import ModalDropdown from '../_modal/ModalDropdown';
import * as St from './CreatePlan.style';

const CreatePlan = () => {
    const [time, setTime] = useState('오후 06시 00분'); // 일정 등록 input에 출력되는 시간
    const [selectedTime, setSelectedTime] = useState({
        // 모달에서 선택된 임시 시간
        ampm: '오후',
        hour: '06시',
        minute: '00분',
    });
    const [title, setTitle] = useState('');
    const [memo, setMemo] = useState('');

    const memoRef = useRef(null);
    const titleRef = useRef(null);

    const { openModal, closeModal } = useModalStore();
    const modalId = 'timeModal';

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.focus();
        }
    }, []);

    // 일정 제목, 메모 글자 수 제한
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

    // 메모 입력 공간 사이즈 updown
    const resizeTextarea = (e) => {
        e.target.style.height = 'auto'; // 다시 줄어들 때
        e.target.style.height = `${e.target.scrollHeight}px`; // 늘어날 때
    };

    // 시간 선택 모달
    const openTimeModal = () => {
        openModal(modalId);
    };

    const handleSelectedTime = (ampm, hour, minute) => {
        setSelectedTime({ ampm, hour, minute });
    };

    const submitSelectedTime = () => {
        setTime(
            `${selectedTime.ampm} ${selectedTime.hour} ${selectedTime.minute}`,
        );
        closeModal(modalId);
    };

    return (
        <St.CreatePlanContainer>
            <h3>일정 정보</h3>
            <St.PlanContainer>
                <St.InputItemBox>
                    <img
                        src="/src/assets/icons/size_24/Icon-calendar.svg"
                        alt="date"
                    />
                    {/* 모달 뜨게 */}
                    <h4 onClick={() => alert('날짜 입력')}>2024년 7월 28일</h4>
                </St.InputItemBox>
                <St.InputItemBox onClick={openTimeModal}>
                    <img
                        src="/src/assets/icons/size_24/Icon-clock.svg"
                        alt="time"
                    />
                    <h4>{time}</h4>
                </St.InputItemBox>
                <St.InputItemBox>
                    <img
                        src="/src/assets/icons/size_24/Icon-title.svg"
                        alt="title"
                    />
                    <St.InputTitleText
                        ref={titleRef}
                        value={title}
                        onChange={handleTitleLength}
                        minLength={titleMin}
                        maxLength={titleMax}
                        placeholder={`제목은 최소 ${titleMin} ~ ${titleMax}자 입력해야 합니다.`}
                    />
                </St.InputItemBox>
                <St.InputItemBox $boxSize="long">
                    <img
                        src="/src/assets/icons/size_24/Icon-memo.svg"
                        alt="memo"
                    />
                    <St.InputMemoText
                        ref={memoRef}
                        value={memo}
                        onChange={handleMemoLength}
                        rows="5"
                        onInput={resizeTextarea}
                        maxLength={memoMax}
                        placeholder={`최대 ${memoMax}자 까지 메모할 수 있습니다.`}
                    />
                </St.InputItemBox>
            </St.PlanContainer>
            <Modal
                modalId={modalId}
                contents={
                    <ModalDropdown handleSelectedTime={handleSelectedTime} />
                }
                buttonText={'저장하기'}
                onButtonClick={submitSelectedTime}
            />
        </St.CreatePlanContainer>
    );
};

export default CreatePlan;
