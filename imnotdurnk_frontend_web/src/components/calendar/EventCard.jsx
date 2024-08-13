import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    convertDateToString,
    dateStringToUrl,
} from '../../hooks/useDateTimeFormatter';
import { saveRestGameResult, saveVoiceGameResult } from '../../services/game';
import useCalendarStore from '../../stores/useCalendarStore';
import useGameStore from '../../stores/useGameStore';
import { ToastSuccess } from '../_common/alert';
import * as St from './EventCard.style';

const EventCard = ({
    alcoholLevel,
    onItemClick,
    parentComponent,
    eventId,
    children,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();

    const { selectedDate } = useCalendarStore();

    const [selectedDateFromPath, setSelectedDateFromPath] = useState(null);
    const today = new Date();
    const todayUrl = dateStringToUrl(convertDateToString(today));

    const {
        voiceGameResult,
        resetVoiceGameResult,
        isVoiceGameResultSet,
        typingGameResult,
        resetTypingGameResult,
        isTypingGameResultSet,
    } = useGameStore();

    useEffect(() => {
        if (location.pathname.startsWith('/calendar/')) {
            const pathDate = location.pathname.split('/')[2];
            const [year, month, day] = pathDate.split('-').map(Number);
            if (year && month && day) {
                setSelectedDateFromPath(new Date(year, month - 1, day));
            }
        }
    }, [location.pathname]);

    const selectedDateForDisplay =
        parentComponent === 'mainCalendar'
            ? selectedDate
            : parentComponent === 'calendarList'
              ? selectedDateFromPath
              : today;

    // 요일 index -> 문자열로 변환하는 함수
    const getDayName = (date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return date ? days[date.getDay()] : null; // TODO: selectedDate 널 체크 사항 -> 이거 뭐야
    };

    // 카드 클릭 시 페이지 이동 동작
    const handleOnClick = async () => {
        if (parentComponent === 'mainCalendar') {
            onItemClick(selectedDate);
        } else if (parentComponent === 'calendarList') {
            const currentPath = location.pathname;
            navigate(`${currentPath}/plan/${eventId}`);
        } else if (parentComponent === 'addGameToPlan') {
            if (isVoiceGameResultSet) {
                const voiceGameResultData = {
                    planId: eventId,
                    score: voiceGameResult.score,
                    filename: voiceGameResult.filename,
                    script: voiceGameResult.script,
                };
                console.log(
                    '서버에 보낼 voiceGameResultData',
                    voiceGameResultData,
                );
                const result = await saveVoiceGameResult({
                    data: voiceGameResultData,
                });

                if (result) {
                    resetVoiceGameResult();

                    // 쿼리 무효화
                    queryClient.invalidateQueries(['planDetail', eventId]);
                    ToastSuccess('게임 기록이 등록되었습니다!', true, true);
                    navigate(`/calendar/${todayUrl}/plan/${eventId}`);
                }
            }

            if (isTypingGameResultSet) {
                const typingGameResultData = {
                    planId: eventId,
                    gameType: typingGameResult.gameType,
                    score: typingGameResult.score,
                };
                console.log(
                    '서버에 보낼 typingGameResultData',
                    typingGameResultData,
                );
                const result = await saveRestGameResult({
                    data: typingGameResultData,
                });

                if (result) {
                    resetTypingGameResult();

                    // 쿼리 무효화
                    queryClient.invalidateQueries(['planDetail', eventId]);
                    ToastSuccess('게임 기록이 등록되었습니다!', true, true);
                    navigate(`/calendar/${todayUrl}/plan/${eventId}`);
                }
            }
        }
    };

    return (
        <St.CalendarItemBox
            $alcoholLevel={alcoholLevel}
            onClick={handleOnClick}
        >
            <St.CalendarItemDate // TODO: selectedDate 널 체크 사항 -> 이거 뭐야
                $isWeekend={
                    selectedDateForDisplay
                        ? selectedDateForDisplay.getDay()
                        : null
                }
            >
                <h4>{getDayName(selectedDateForDisplay)}</h4>
                <h2>{selectedDateForDisplay?.getDate()}</h2>
            </St.CalendarItemDate>
            <St.CalendarItemBodyBox>{children}</St.CalendarItemBodyBox>
        </St.CalendarItemBox>
    );
};

export default EventCard;
