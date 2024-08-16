import { styled } from 'styled-components';

const DropButton = styled.div`
    position: relative;
    display: inline-flex;
    justify-content: center;
    width: ${({ $full }) => ($full ? '17rem' : 'auto')};
    border-radius: 10px;
    background: var(--color-white1, #fff);
    // border: 1px solid #ccc; */ 배경이 흰색일 때 테스트 용입니다*/
`;

const DropdownHeader = styled.div`
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    height: 2.8571rem; /* 40px -> 2.86rem */
    padding: 0rem 0.93rem; /* 0px 13px -> 0px 0.93rem */
    gap: 0.36rem; /* 5px -> 0.36rem */
    cursor: pointer;
`;

const DropdownList = styled.ul`
    z-index: 1000;

    position: absolute;
    bottom: 120%;
    left: 0;

    width: 100%;
    max-height: 14.2857rem;

    margin-top: 0.71rem; /* 10px -> 0.71rem */

    border-radius: 10px;
    background: var(--color-white2, #f7f7ec);

    overflow: scroll;

    /* 스크롤바 숨기기 (크롬, 사파리, 엣지 등 웹킷 브라우저용) */
    &::-webkit-scrollbar {
        display: none;
    }

    /* 스크롤바 숨기기 (파이어폭스용) */
    scrollbar-width: none; /* Firefox */
`;

const DropdownItem = styled.li`
    padding: 0.71rem; /* 10px -> 0.71rem */
    text-align: center;
    cursor: pointer;

    ${({ $isFirst }) =>
        $isFirst &&
        `
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    `}

    ${({ $isLast }) =>
        $isLast &&
        `
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    `}

    &:hover {
        background-color: var(--color-white1, #fff);
    }
`;

export { DropButton, DropdownHeader, DropdownItem, DropdownList };
