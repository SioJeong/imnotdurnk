import useCalendarStore from '../../stores/useCalendarStore';
import useModalStore from '../../stores/useModalStore';
import Modal from '../_modal/Modal';
import ModalAlcohol from '../_modal/ModalAlcohol';
import ModalAlcoholLevelDropdown from '../_modal/ModalAlcoholLevelDropdown';
import ModalArrivalTimeDropdown from '../_modal/ModalArrivalTimeDropdown';
import ModalDateDropdown from '../_modal/ModalDateDropdown';
import ModalTimeDropdown from '../_modal/ModalTimeDropdown';

const CreatePlanModalController = ({
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedSojuCount,
    setSelectedSojuCount,
    selectedBeerCount,
    setSelectedBeerCount,
    selectedAlcoholLevel,
    setSelectedAlcoholLevel,
    selectedArrivalTime,
    setSelectedArrivalTime,
}) => {
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

    // 소주, 맥주 마신 양 선택 모달
    const handleSelectedSojuCount = (sojuCount) => {
        setSelectedSojuCount(sojuCount);
    };

    const handleSelectedBeerCount = (beerCount) => {
        setSelectedBeerCount(beerCount);
    };

    const submitSelectedAlcohol = () => {
        setPlan({
            sojuAmount: selectedSojuCount,
            beerAmount: selectedBeerCount,
        });
        closeModal('alcoholModal');
    };

    // 만취 정도 선택 모달
    const handleSelectedAlcoholLevel = (alcoholLevel) => {
        setSelectedAlcoholLevel(alcoholLevel);
    };

    const submitSelectedAlcoholLevel = () => {
        setPlan({ alcoholLevel: selectedAlcoholLevel });
        closeModal('alcoholLevelModal');
    };

    // 귀가 시간 선택 모달
    const handleSelectedArrivalTime = (ampm, hour, minute) => {
        setSelectedArrivalTime({ ampm, hour, minute });
    };

    const submitSelectedArrivalTime = () => {
        const timeStr = `${selectedArrivalTime.ampm} ${selectedArrivalTime.hour} ${selectedArrivalTime.minute}`;
        setPlan({ arrivalTime: timeStr });
        closeModal('arrivalTimeModal');
    };

    return (
        <>
            <Modal
                modalId="dateModal"
                contents={
                    <ModalDateDropdown
                        selectedDate={selectedDate}
                        handleSelectedDate={handleSelectedDate}
                    />
                }
                buttonText={'저장하기'}
                onButtonClick={submitSelectedDate}
            />
            <Modal
                modalId="timeModal"
                contents={
                    <ModalTimeDropdown
                        selectedTime={selectedTime}
                        handleSelectedTime={handleSelectedTime}
                    />
                }
                buttonText={'저장하기'}
                onButtonClick={submitSelectedTime}
            />
            <Modal
                modalId="alcoholModal"
                contents={
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.7143rem',
                        }}
                    >
                        <ModalAlcohol
                            drinkType={'소주'}
                            selectedSojuCount={selectedSojuCount}
                            handleSelectedSojuCount={handleSelectedSojuCount}
                        />
                        <ModalAlcohol
                            drinkType={'맥주'}
                            selectedBeerCount={selectedBeerCount}
                            handleSelectedBeerCount={handleSelectedBeerCount}
                        />
                    </div>
                }
                buttonText={'저장하기'}
                onButtonClick={submitSelectedAlcohol}
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
            <Modal
                modalId="arrivalTimeModal"
                contents={
                    <ModalArrivalTimeDropdown
                        selectedArrivalTime={selectedArrivalTime}
                        handleSelectedArrivalTime={handleSelectedArrivalTime}
                    />
                }
                buttonText={'저장하기'}
                onButtonClick={submitSelectedArrivalTime}
            />
        </>
    );
};

export default CreatePlanModalController;
