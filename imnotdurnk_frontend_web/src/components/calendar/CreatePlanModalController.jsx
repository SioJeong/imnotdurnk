import { useState } from 'react';
import useCalendarStore from '../../stores/useCalendarStore';
import useModalStore from '../../stores/useModalStore';
import Modal from '../_modal/Modal';
import ModalAlcoholLevelDropdown from '../_modal/ModalAlcoholLevelDropdown';
import ModalDateDropdown from '../_modal/ModalDateDropdown';
import ModalTimeDropdown from '../_modal/ModalTimeDropdown';

const CreatePlanModalController = ({
    selectedAlcoholLevel,
    setSelectedAlcoholLevel,
}) => {
    // TODO: 코드로 변경해야 함 (ModalDateDropdown 연동)
    const [selectedDate, setSelectedDate] = useState({
        year: '2024년',
        month: '8월',
        day: '3일',
    });
    const [selectedTime, setSelectedTime] = useState({
        ampm: '오후',
        hour: '06시',
        minute: '00분',
    });

    const { closeModal } = useModalStore();
    const { setPlan } = useCalendarStore();

    // 날짜 선택 모달
    const handleSelectedDate = (year, month, day) => {
        setSelectedDate({ year, month, day });
    };

    const submitSelectedDate = () => {
        const dateStr = `${selectedDate.year} ${selectedDate.month} ${selectedDate.day}`;
        setPlan({ date: dateStr });
        closeModal('dateModal');
    };

    // 시간 선택 모달
    const handleSelectedTime = (ampm, hour, minute) => {
        setSelectedTime({ ampm, hour, minute });
    };

    const submitSelectedTime = () => {
        const timeStr = `${selectedTime.ampm} ${selectedTime.hour} ${selectedTime.minute}`;
        setPlan({ time: timeStr });
        closeModal('timeModal');
    };

    // 만취 정도 선택 모달
    const handleSelectedAlcoholLevel = (alcoholLevel) => {
        setSelectedAlcoholLevel(alcoholLevel);
    };

    const submitSelectedAlcoholLevel = () => {
        setPlan({ alcoholLevel: selectedAlcoholLevel });
        closeModal('alcoholLevelModal');
    };

    return (
        <>
            <Modal
                modalId="timeModal"
                contents={
                    <ModalTimeDropdown
                        handleSelectedTime={handleSelectedTime}
                    />
                }
                buttonText={'저장하기'}
                onButtonClick={submitSelectedTime}
            />
            <Modal
                modalId="dateModal"
                contents={
                    <ModalDateDropdown
                        handleSelectedDate={handleSelectedDate}
                    />
                }
                buttonText={'저장하기'}
                onButtonClick={submitSelectedDate}
            />
            <Modal
                modalId="alcoholLevelModal"
                contents={
                    <ModalAlcoholLevelDropdown
                        selectedAlcoholLevel={selectedAlcoholLevel}
                        handleSelectedAlcoholLevel={handleSelectedAlcoholLevel}
                    />
                }
                buttonText={'저장하기'}
                onButtonClick={submitSelectedAlcoholLevel}
            />
        </>
    );
};

export default CreatePlanModalController;
