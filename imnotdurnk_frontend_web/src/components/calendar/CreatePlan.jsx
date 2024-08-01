import { calendarMinmax } from '@/shared/constants/minmaxLength';
import { useEffect, useRef, useState } from 'react';
import useCalendarStore from '../../stores/useCalendarStore';
import useModalStore from '../../stores/useModalStore';
import Modal from '../_modal/Modal';
import ModalDateDropdown from '../_modal/ModalDateDropdown';
import ModalTimeDropdown from '../_modal/ModalTimeDropdown';
import * as St from './CreatePlan.style';

const CreatePlan = () => {
    const [selectedDate, setSelectedDate] = useState({
        year: '2024년',
        month: '8월',
        day: '1일',
    });
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
    const timeModalId = 'timeModal';
    const dateModalId = 'dateModal';

    const { plan, setPlan, resetPlan } = useCalendarStore();

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
            setPlan({ title: input });
        }
    };

    const handleMemoLength = (e) => {
        const input = e.target.value;
        if (input.length <= memoMax) {
            setMemo(input);
            setPlan({ memo: input });
        }
    };

    // 메모 입력 공간 사이즈 updown
    const resizeTextarea = (e) => {
        e.target.style.height = 'auto'; // 다시 줄어들 때
        e.target.style.height = `${e.target.scrollHeight}px`; // 늘어날 때
    };

    // 날짜 선택 모달
    const openDateModal = () => {
        openModal(dateModalId);
    };

    const handleSelectedDate = (year, month, day) => {
        setSelectedDate({ year, month, day });
    };

    const submitSelectedDate = () => {
        const dateStr = `${selectedDate.year} ${selectedDate.month} ${selectedDate.day}`;
        setPlan({ date: dateStr });
        closeModal(dateModalId);
    };

    // 시간 선택 모달
    const openTimeModal = () => {
        openModal(timeModalId);
    };

    const handleSelectedTime = (ampm, hour, minute) => {
        setSelectedTime({ ampm, hour, minute });
    };

    const submitSelectedTime = () => {
        const timeStr = `${selectedTime.ampm} ${selectedTime.hour} ${selectedTime.minute}`;
        setPlan({ time: timeStr });
        closeModal(timeModalId);
    };

    return (
        <St.CreatePlanContainer>
            <h3>일정 정보</h3>
            <St.PlanContainer>
                <St.InputItemBox onClick={openDateModal}>
                    <img
                        src="/src/assets/icons/size_24/Icon-calendar.svg"
                        alt="date"
                    />
                    <h4>{plan.date || '날짜를 선택하세요.'}</h4>
                </St.InputItemBox>
                <St.InputItemBox onClick={openTimeModal}>
                    <img
                        src="/src/assets/icons/size_24/Icon-clock.svg"
                        alt="time"
                    />
                    <h4>{plan.time || '시간을 선택하세요'}</h4>
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
                modalId={timeModalId}
                contents={
                    <ModalTimeDropdown
                        handleSelectedTime={handleSelectedTime}
                    />
                }
                buttonText={'저장하기'}
                onButtonClick={submitSelectedTime}
            />
            <Modal
                modalId={dateModalId}
                contents={
                    <ModalDateDropdown
                        handleSelectedDate={handleSelectedDate}
                    />
                }
                buttonText={'저장하기'}
                onButtonClick={submitSelectedDate}
            />
        </St.CreatePlanContainer>
    );
};

export default CreatePlan;
