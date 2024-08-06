import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { alcoholLevelToString } from '../../hooks/useAlcoholLevelFormatter';
import {
    convertDateToString,
    convertTimeToString,
    formatTime,
} from '../../hooks/useDateTimeFormatter';
import { getEventDetail } from '../../services/calendar';
import useCalendarStore from '../../stores/useCalendarStore';
import useNavigationStore from '../../stores/useNavigationStore';
import * as St from './PlanDetail.style';

const PlanDetail = () => {
    const location = useLocation();
    const planId = location.pathname.split('/')[4];

    const setNavigation = useNavigationStore((state) => state.setNavigation);
    const { setFullPlanDetail } = useCalendarStore();

    const {
        data: planDetail,
        error,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['planDetail', planId],
        queryFn: () => getEventDetail({ planId }),
        enabled: !!planId, // planId 있을 때만 쿼리 실행
        keepPreviousData: true, // 새 데이터 가져오는 동안 이전 데이터 유지
    });

    // PlanDetail 컴포넌트 렌더링 후에 Navigation 컴포넌트 상태 업데이트 해야 함
    useEffect(() => {
        if (planDetail) {
            const date = convertDateToString(new Date(planDetail.date));
            const time = convertTimeToString(new Date(planDetail.date));
            setFullPlanDetail({ ...planDetail, date, time }); // 전역에 저장해서 수정 시 데이터 사용..
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '-1' },
                title: `${planDetail.title}`,
                icon2: { iconname: 'modify', path: 'goEditPlan' },
            });
        }
    }, [planDetail, setNavigation]);

    const sojuBottle = Math.floor(planDetail?.sojuAmount / 8);
    const sojuGlass = planDetail?.sojuAmount % 8;
    const beerBottle = Math.floor(planDetail?.beerAmount / 500);
    const beerGlass = Math.round((planDetail?.beerAmount % 500) / 355);

    const arrivalTimeString = planDetail?.arrivalTime;

    return (
        <St.Container>
            <St.ScheduleContainer $alcoholLevel={planDetail?.alcoholLevel || 0}>
                <St.ScheduleTitle $alcoholLevel={planDetail?.alcoholLevel || 0}>
                    일정 정보
                </St.ScheduleTitle>
                <St.InputContainer>
                    <St.InputItemBox>
                        <img
                            src="/src/assets/icons/size_24/Icon-calendar.svg"
                            alt="date"
                        />
                        <h4>
                            {convertDateToString(new Date(planDetail?.date))}
                        </h4>
                    </St.InputItemBox>
                    <St.InputItemBox>
                        <img
                            src="/src/assets/icons/size_24/Icon-clock.svg"
                            alt="time"
                        />
                        <h4>
                            {convertTimeToString(new Date(planDetail?.date))}
                        </h4>
                    </St.InputItemBox>
                    <St.InputItemBox>
                        <img
                            src="/src/assets/icons/size_24/Icon-title.svg"
                            alt="title"
                        />
                        <St.TitleAndMemo>{planDetail?.title}</St.TitleAndMemo>
                    </St.InputItemBox>
                    <St.InputItemBox $boxSize="long">
                        <St.MemoIconImage
                            src="/src/assets/icons/size_24/Icon-memo.svg"
                            alt="memo"
                        />
                        <St.TitleAndMemo>
                            {planDetail?.memo || '메모가 없습니다.'}
                        </St.TitleAndMemo>
                    </St.InputItemBox>
                </St.InputContainer>
            </St.ScheduleContainer>
            <St.AlcoholContainer>
                <St.AlcoholTitle>음주 기록</St.AlcoholTitle>
                <St.InputContainer>
                    <St.DrinkInputBox>
                        <St.InputItemBox $alcoholCount={true}>
                            <St.AlcoholCountImage
                                src="/src/assets/images/mini-soju-bottle.webp"
                                alt="soju"
                                $isSoju={true}
                            />
                            <h4>
                                {sojuBottle}병 {sojuGlass}잔
                            </h4>
                        </St.InputItemBox>
                        <St.InputItemBox $alcoholCount={true}>
                            <St.AlcoholCountImage
                                src="/src/assets/images/mini-beer-bottle.webp"
                                alt="beer"
                                $isSoju={false}
                            />
                            <h4>
                                {beerBottle}병 {beerGlass}잔
                            </h4>
                        </St.InputItemBox>
                    </St.DrinkInputBox>

                    <St.InputItemBox>
                        <St.InputItemBoxTitle>
                            <img
                                src="/src/assets/icons/size_24/Icon-health.svg"
                                alt="alcohol-level"
                            />
                            <h4>만취 정도</h4>
                        </St.InputItemBoxTitle>
                        <h4>
                            {alcoholLevelToString(planDetail?.alcoholLevel)}
                        </h4>
                    </St.InputItemBox>
                    <St.InputItemBox>
                        <St.InputItemBoxTitle>
                            <img
                                src="/src/assets/icons/size_24/Icon-clock.svg"
                                alt="arrival-time"
                            />
                            <h4>귀가 시간</h4>
                        </St.InputItemBoxTitle>
                        <h4>
                            {arrivalTimeString
                                ? formatTime(arrivalTimeString)
                                : '-'}
                        </h4>
                    </St.InputItemBox>
                </St.InputContainer>
            </St.AlcoholContainer>
        </St.Container>
    );
};

export default PlanDetail;
