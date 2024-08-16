import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    convertDateToString,
    convertTimeToString,
} from '../../hooks/useDateTimeFormatter';
import { deleteEvent, getEventDetail } from '../../services/calendar';
import { icons } from '../../shared/constants/icons';
import useCalendarStore from '../../stores/useCalendarStore';
import useModalStore from '../../stores/useModalStore';
import useNavigationStore from '../../stores/useNavigationStore';
import Button from '../_button/Button';
import { ToastSuccess } from '../_common/alert';
import Loading from '../_common/Loading';
import Modal from '../_modal/Modal';
import ModalTextBox from '../_modal/ModalTextBox';
import CalendarStatusBar from './CalendarStatusBar';
import * as St from './PlanDetail.style';
import PlanDetailAlcohol from './PlanDetailAlcohol';
import PlanDetailGame from './PlanDetailGame';

const PlanDetail = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const location = useLocation();
    const planId = location.pathname.split('/')[4];

    const { openModal, closeModal } = useModalStore();
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    const { setFullPlanDetail, resetPlanDetail } = useCalendarStore();

    const [selectedGameType, setSelectedGameType] = useState(1); // 최초 발음 게임

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
                icon1: {
                    iconname: 'backarrow',
                    path: `/calendar/${planDetail.date.split('T')[0]}`,
                },
                title: `${planDetail.title}`,
                icon2: { iconname: 'modify', path: 'goEditPlan' },
            });
        }
    }, [planDetail, setNavigation, setFullPlanDetail]);

    const sojuBottle = Math.floor(planDetail?.sojuAmount / 8);
    const sojuGlass = planDetail?.sojuAmount % 8;
    const beerBottle = Math.floor(planDetail?.beerAmount / 500);
    const beerGlass = Math.round((planDetail?.beerAmount % 500) / 355);

    const deletePlan = async () => {
        const [year, month] = planDetail.date.split('T')[0].split('-');

        try {
            const success = await deleteEvent({ planId }); // api 요청

            if (success) {
                // 쿼리 무효화
                queryClient.invalidateQueries(['allEventList']);
                ToastSuccess('일정이 삭제되었습니다', true);
                resetPlanDetail();
                navigate('/calendar'); // 캘린더 페이지로 이동
                return true;
            }
        } catch (error) {
        }

        return false;
    };

    const onClickDeletePlanButton = () => {
        openModal('deletePlanModal');
    };

    const onClickConfirmDeletePlanButton = async () => {
        await deletePlan();
        closeModal('deletePlanModal');
    };

    return (
        <St.PlanDetailContainer>
            <CalendarStatusBar />
            <St.PlanDetailBox>
                {isLoading ? (
                    <St.LoadingBox>
                        <Loading text={'일정 상세 정보를 가져오는 중입니다.'} />
                    </St.LoadingBox>
                ) : isError ? (
                    <St.LoadingAndErrorText>
                        Error: {error.message}
                    </St.LoadingAndErrorText>
                ) : (
                    <>
                        <St.ScheduleContainer
                            $alcoholLevel={planDetail?.alcoholLevel || 0}
                        >
                            <St.ScheduleTitle
                                $alcoholLevel={planDetail?.alcoholLevel || 0}
                            >
                                일정 정보
                            </St.ScheduleTitle>
                            <St.InputContainer>
                                <St.InputItemBox>
                                    <img src={icons['calendar']} alt="date" />
                                    <h4>
                                        {convertDateToString(
                                            new Date(planDetail?.date),
                                        )}
                                    </h4>
                                </St.InputItemBox>
                                <St.InputItemBox>
                                    <img src={icons['clock']} alt="time" />
                                    <h4>
                                        {convertTimeToString(
                                            new Date(planDetail?.date),
                                        )}
                                    </h4>
                                </St.InputItemBox>
                                <St.InputItemBox>
                                    <img src={icons['title']} alt="title" />
                                    <St.TitleAndMemo>
                                        {planDetail?.title}
                                    </St.TitleAndMemo>
                                </St.InputItemBox>
                                <St.InputItemBox $boxSize="long">
                                    <St.MemoIconImage
                                        src={icons['memo']}
                                        alt="memo"
                                    />
                                    <St.TitleAndMemo>
                                        {planDetail?.memo || '메모가 없습니다.'}
                                    </St.TitleAndMemo>
                                </St.InputItemBox>
                            </St.InputContainer>
                        </St.ScheduleContainer>

                        <PlanDetailAlcohol
                            planDetailDate={planDetail.date}
                            sojuBottle={sojuBottle}
                            sojuGlass={sojuGlass}
                            beerBottle={beerBottle}
                            beerGlass={beerGlass}
                            arrivalTime={planDetail?.arrivalTime}
                            alcoholLevel={planDetail?.alcoholLevel}
                        />

                        <PlanDetailGame
                            selectedGameType={selectedGameType}
                            setSelectedGameType={setSelectedGameType}
                            gameLogs={planDetail.gameLogDtos}
                        />
                        <Button
                            text={'일정 삭제하기'}
                            isRed={false}
                            border={true}
                            onClick={onClickDeletePlanButton}
                        />
                    </>
                )}
            </St.PlanDetailBox>
            <Modal
                modalId="deletePlanModal"
                contents={<ModalTextBox text="일정을 삭제 하시겠습니까?" />}
                buttonText={'삭제하기'}
                onButtonClick={onClickConfirmDeletePlanButton}
            />
        </St.PlanDetailContainer>
    );
};

export default PlanDetail;
