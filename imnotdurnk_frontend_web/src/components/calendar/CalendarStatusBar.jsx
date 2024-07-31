import * as St from './CalendarStatusBar.style';

const CalendarStatusBar = () => {
    return (
        <St.AlcoholLevelBox>
            <St.AlcoholLevel>
                <St.StatusDot $alcoholLevel={0} />
                <St.StatusExplain>시작 전</St.StatusExplain>
            </St.AlcoholLevel>
            <St.AlcoholLevel>
                <St.StatusDot $alcoholLevel={1} />
                <St.StatusExplain>취하지 않음</St.StatusExplain>
            </St.AlcoholLevel>
            <St.AlcoholLevel>
                <St.StatusDot $alcoholLevel={2} />
                <St.StatusExplain>적당히 취함</St.StatusExplain>
            </St.AlcoholLevel>
            <St.AlcoholLevel>
                <St.StatusDot $alcoholLevel={3} />
                <St.StatusExplain>만취</St.StatusExplain>
            </St.AlcoholLevel>
        </St.AlcoholLevelBox>
    );
};

export default CalendarStatusBar;
