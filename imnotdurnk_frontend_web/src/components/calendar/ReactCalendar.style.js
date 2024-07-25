import { styled } from 'styled-components';

const DateTile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 10rem;

    background-color: yellow;
`;

const Date = styled.p`
    font-size: var(--font-title-h3);
    font-weight: 500;
    color: var(--color-white1);
`;

const EventList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */

    /* margin-top: 4px; */
`;

const EventItem = styled.li`
    /* display: inline-block; */
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: var(--color-red);
`;

export { Date, DateTile, EventItem, EventList };
