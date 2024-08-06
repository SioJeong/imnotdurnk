import { calendarMinmax } from '@/shared/constants/minmaxLength';
import { useEffect, useRef, useState } from 'react';
import { alcoholLevelToString } from '../../hooks/useAlcoholLevelFormatter';
import { formatDateTime } from '../../hooks/useDateTimeFormatter';
import useCalendarStore from '../../stores/useCalendarStore';
import useModalStore from '../../stores/useModalStore';
import * as St from './CreatePlan.style';
import EditPlanAlcohol from './EditPlanAlcohol';
import EditPlanModalController from './EditPlanModalController';

const EditPlan = () => {
    const { plan, planDetail, setPlanDetail } = useCalendarStore();
    const { openModal } = useModalStore();

    // input 영역 상태 관리
    const [selectedDate, setSelectedDate] = useState({});
    const [selectedTime, setSelectedTime] = useState({});
    const [title, setTitle] = useState('');
    const [memo, setMemo] = useState('');

    const [selectedSojuBottleCount, setSelectedSojuBottleCount] = useState(
        Math.floor(plan.sojuAmount / 8),
    );
    const [selectedSojuGlassCount, setSelectedSojuGlassCount] = useState(
        plan.sojuAmount % 8,
    );
    const [selectedBeerBottleCount, setSelectedBeerBottleCount] = useState(
        Math.floor(plan.beerAmount / 500),
    );
    const [selectedBeerGlassCount, setSelectedBeerGlassCount] = useState(
        Math.round((plan.beerAmount % 500) / 355),
    );

    const [selectedAlcoholLevel, setSelectedAlcoholLevel] = useState('');

    const [selectedArrivalTime, setSelectedArrivalTime] = useState({
        ampm: '오후',
        hour: '10시',
        minute: '00분',
    });

    const memoRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        console.log(planDetail);
        const { formattedDate, formattedTime } = formatDateTime(
            planDetail.date,
        );
        const [year, month, day] = formattedDate.split(' ');
        setSelectedDate({
            year,
            month,
            day,
        });
        const [ampm, hour, minute] = formattedTime.split(' ');
        setSelectedTime({
            ampm,
            hour,
            minute,
        });
        setTitle(planDetail.title);
        setMemo(planDetail.memo);
        setSelectedAlcoholLevel(alcoholLevelToString(planDetail.alcoholLevel));
    }, [planDetail]);

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
            setPlanDetail({ title: input });
        }
    };

    const handleMemoLength = (e) => {
        const input = e.target.value;
        if (input.length <= memoMax) {
            setMemo(input);
            setPlanDetail({ memo: input });
        }
    };

    // 메모 입력 공간 사이즈 updown
    const resizeTextarea = (e) => {
        e.target.style.height = 'auto'; // 다시 줄어들 때
        e.target.style.height = `${e.target.scrollHeight}px`; // 늘어날 때
    };

    return (
        <>
            <St.Container>
                <St.ScheduleContainer>
                    <h3>일정 정보</h3>
                    <St.InputContainer>
                        <St.InputItemBox
                            onClick={() => openModal('dateModal')}
                            $cursor={true}
                        >
                            <img
                                src="/src/assets/icons/size_24/Icon-calendar.svg"
                                alt="date"
                            />
                            <h4>{plan.date}</h4>
                        </St.InputItemBox>
                        <St.InputItemBox
                            onClick={() => openModal('timeModal')}
                            $cursor={true}
                        >
                            <img
                                src="/src/assets/icons/size_24/Icon-clock.svg"
                                alt="time"
                            />
                            <h4>{plan.time}</h4>
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
                    </St.InputContainer>
                </St.ScheduleContainer>
                <EditPlanAlcohol
                    openAlcoholModal={() => openModal('alcoholModal')}
                    openAlcoholLevelModal={() => openModal('alcoholLevelModal')}
                    openArrivalTimeModal={() => openModal('arrivalTimeModal')}
                    selectedSojuBottleCount={selectedSojuBottleCount}
                    selectedSojuGlassCount={selectedSojuGlassCount}
                    selectedBeerBottleCount={selectedBeerBottleCount}
                    selectedBeerGlassCount={selectedBeerGlassCount}
                    selectedAlcoholLevel={selectedAlcoholLevel}
                />
            </St.Container>
            <EditPlanModalController
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                selectedSojuBottleCount={selectedSojuBottleCount}
                setSelectedSojuBottleCount={setSelectedSojuBottleCount}
                selectedSojuGlassCount={selectedSojuGlassCount}
                setSelectedSojuGlassCount={setSelectedSojuGlassCount}
                selectedBeerBottleCount={selectedBeerBottleCount}
                setSelectedBeerBottleCount={setSelectedBeerBottleCount}
                selectedBeerGlassCount={selectedBeerGlassCount}
                setSelectedBeerGlassCount={setSelectedBeerGlassCount}
                selectedAlcoholLevel={selectedAlcoholLevel}
                setSelectedAlcoholLevel={setSelectedAlcoholLevel}
                selectedArrivalTime={selectedArrivalTime}
                setSelectedArrivalTime={setSelectedArrivalTime}
            />
        </>
    );
};

export default EditPlan;
