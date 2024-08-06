import useCalendarStore from '../../stores/useCalendarStore';
import useModalStore from '../../stores/useModalStore';
import Modal from '../_modal/Modal';
import ModalAlcohol from '../_modal/ModalAlcohol';
import ModalAlcoholLevelDropdown from '../_modal/ModalAlcoholLevelDropdown';
import ModalArrivalTimeDropdown from '../_modal/ModalArrivalTimeDropdown';
import ModalDateDropdown from '../_modal/ModalDateDropdown';
import ModalTimeDropdown from '../_modal/ModalTimeDropdown';

const EditPlanModalController = ({
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedSojuBottleCount,
    setSelectedSojuBottleCount,
    selectedSojuGlassCount,
    setSelectedSojuGlassCount,
    selectedBeerBottleCount,
    setSelectedBeerBottleCount,
    selectedBeerGlassCount,
    setSelectedBeerGlassCount,
    selectedAlcoholLevel,
    setSelectedAlcoholLevel,
    selectedArrivalTime,
    setSelectedArrivalTime,
}) => {
    const { closeModal } = useModalStore();
    const { setPlanDetail } = useCalendarStore();

    // 날짜 선택 모달
    const handleSelectedDate = (year, month, day) => {
        setSelectedDate({ year, month, day });
    };

    const submitSelectedDate = () => {
        const dateStr = `${selectedDate.year} ${selectedDate.month} ${selectedDate.day}`;
        setPlanDetail({ date: dateStr });
        closeModal('dateModal');
    };

    // 시간 선택 모달
    const handleSelectedTime = (ampm, hour, minute) => {
        setSelectedTime({ ampm, hour, minute });
    };

    const submitSelectedTime = () => {
        const timeStr = `${selectedTime.ampm} ${selectedTime.hour} ${selectedTime.minute}`;
        setPlanDetail({ time: timeStr });
        closeModal('timeModal');
    };

    // 소주, 맥주 마신 양 선택 모달
    const handleSelectedSojuBottleCount = (sojuBottleCount) => {
        setSelectedSojuBottleCount(sojuBottleCount);
    };

    const handleSelectedSojuGlassCount = (sojuGlassCount) => {
        setSelectedSojuGlassCount(sojuGlassCount);
    };

    const handleSelectedBeerBottleCount = (beerBottleCount) => {
        setSelectedBeerBottleCount(beerBottleCount);
    };

    const handleSelectedBeerGlassCount = (beerGlassCount) => {
        setSelectedBeerGlassCount(beerGlassCount);
    };

    const submitSelectedAlcohol = () => {
        setPlanDetail({
            sojuAmount: selectedSojuBottleCount * 8 + selectedSojuGlassCount,
            beerAmount:
                selectedBeerBottleCount * 500 + selectedBeerGlassCount * 355,
        });
        closeModal('alcoholModal');
    };

    // 만취 정도 선택 모달
    const handleSelectedAlcoholLevel = (alcoholLevel) => {
        setSelectedAlcoholLevel(alcoholLevel);
    };

    const submitSelectedAlcoholLevel = () => {
        setPlanDetail({
            alcoholLevel: parseInt(selectedAlcoholLevel.split(':')[0]),
        });
        closeModal('alcoholLevelModal');
    };

    // 귀가 시간 선택 모달
    const handleSelectedArrivalTime = (ampm, hour, minute) => {
        setSelectedArrivalTime({ ampm, hour, minute });
    };

    const submitSelectedArrivalTime = () => {
        const timeStr = `${selectedArrivalTime.ampm} ${selectedArrivalTime.hour} ${selectedArrivalTime.minute}`;
        setPlanDetail({ arrivalTime: timeStr });
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
                            selectedSojuBottleCount={selectedSojuBottleCount}
                            handleSelectedSojuBottleCount={
                                handleSelectedSojuBottleCount
                            }
                            selectedSojuGlassCount={selectedSojuGlassCount}
                            handleSelectedSojuGlassCount={
                                handleSelectedSojuGlassCount
                            }
                        />
                        <ModalAlcohol
                            drinkType={'맥주'}
                            selectedBeerBottleCount={selectedBeerBottleCount}
                            handleSelectedBeerBottleCount={
                                handleSelectedBeerBottleCount
                            }
                            selectedBeerGlassCount={selectedBeerGlassCount}
                            handleSelectedBeerGlassCount={
                                handleSelectedBeerGlassCount
                            }
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

export default EditPlanModalController;
