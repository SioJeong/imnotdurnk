import { icons } from '@/shared/constants/icons';
import { calendarMinmax } from '@/shared/constants/minmaxLength';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    convertDateToString,
    parseDateTime,
} from '../../hooks/useDateTimeFormatter';
import useCalendarStore from '../../stores/useCalendarStore';
import useModalStore from '../../stores/useModalStore';
import * as St from './CreatePlan.style';
import CreatePlanAlcohol from './CreatePlanAlcohol';
import CreatePlanModalController from './CreatePlanModalController';

const CreatePlan = () => {
    // 게임 기록과 함께 일정 등록하는 지 확인 (날짜/시간 수정 불가하도록 처리하기 위해)
    const location = useLocation();
    const isFromGame = location.state?.isFromGame || false;

    const { selectedDate, plan, setPlan } = useCalendarStore();
    const { openModal } = useModalStore();

    const [year, month, day] = convertDateToString(selectedDate).split(' ');
    const [ampm, hour, minute] = plan.time.split(' ');

    // input 영역 상태 관리
    const [selectedDateInput, setSelectedDateInput] = useState({
        year,
        month,
        day,
    });
    const [selectedTime, setSelectedTime] = useState({
        ampm,
        hour,
        minute,
    });
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

    const [selectedAlcoholLevel, setSelectedAlcoholLevel] =
        useState('0: 취하지 않음');

    const [selectedArrivalTime, setSelectedArrivalTime] = useState({
        ampm: '오후',
        hour: '10시',
        minute: '00분',
    });

    const memoRef = useRef(null);
    const titleRef = useRef(null);

    const today = parseDateTime(
        convertDateToString(new Date()),
        '오전 12시 00분',
    );
    const planDate = parseDateTime(plan.date, '오전 12시 00분');

    // 오늘 이전(오늘 포함)에 등록하는 경우에만 알코올 관련 기록 가능
    const shouldRenderAlcoholComponent = planDate <= today;

    // CreatePlan 컴포넌트 최초 렌더링 시, selectedDate를 초기값으로 설정
    useEffect(() => {
        setPlan({ date: convertDateToString(selectedDate) });
    }, [selectedDate]);

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

    return (
        <>
            <St.Container>
                <St.ScheduleContainer
                    $alcoholLevel={Number(plan.alcoholLevel.split(':')[0])}
                >
                    <h3>일정 정보</h3>
                    <St.InputContainer>
                        <St.InputItemBox
                            // 게임 기록 등록(isFromGame)이라면 날짜 변경 불가 !!
                            onClick={() =>
                                !isFromGame && openModal('dateModal')
                            }
                            $cursor={!isFromGame}
                        >
                            <img src={icons['calendar']} alt="date" />
                            <h4>{plan.date}</h4>
                        </St.InputItemBox>
                        <St.InputItemBox
                            // 게임 기록 등록(isFromGame)이라면 시간 변경 불가 !!
                            onClick={() =>
                                !isFromGame && openModal('timeModal')
                            }
                            $cursor={!isFromGame}
                        >
                            <img src={icons['clock']} alt="time" />
                            <h4>{plan.time}</h4>
                        </St.InputItemBox>
                        <St.InputItemBox>
                            <img src={icons['title']} alt="title" />
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
                            <img src={icons['memo']} alt="memo" />
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
                {shouldRenderAlcoholComponent ? (
                    <CreatePlanAlcohol
                        openAlcoholModal={() => openModal('alcoholModal')}
                        openAlcoholLevelModal={() =>
                            openModal('alcoholLevelModal')
                        }
                        openArrivalTimeModal={() =>
                            openModal('arrivalTimeModal')
                        }
                        selectedSojuBottleCount={selectedSojuBottleCount}
                        selectedSojuGlassCount={selectedSojuGlassCount}
                        selectedBeerBottleCount={selectedBeerBottleCount}
                        selectedBeerGlassCount={selectedBeerGlassCount}
                    />
                ) : (
                    <St.NoticeAboutFuturePlan>
                        미래 일정에는 음주 및 게임 기록이 저장되지 않습니다.
                    </St.NoticeAboutFuturePlan>
                )}
            </St.Container>
            <CreatePlanModalController
                selectedDateInput={selectedDateInput}
                setSelectedDateInput={setSelectedDateInput}
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

export default CreatePlan;
