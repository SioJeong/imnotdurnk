import { styled } from 'styled-components';

const DropButton = styled.div`
    position: relative;
    display: inline-flex;
    border-radius: 10px;
    background: var(--color-white1, #fff);
    // border: 1px solid #ccc; */ 배경이 흰색일 때 테스트 용입니다*/
`;

const DropdownHeader = styled.div`
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    height: 2.86rem; /* 40px -> 2.86rem */
    padding: 0px 0.93rem; /* 0px 13px -> 0px 0.93rem */
    gap: 0.36rem; /* 5px -> 0.36rem */
    cursor: pointer;
`;

const DropdownList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin-top: 0.71rem; /* 10px -> 0.71rem */
    border-radius: 10px;
    background: var(--color-white2, #f7f7ec);
    list-style: none;
    z-index: 1000;
`;

const DropdownItem = styled.li`
    padding: 0.71rem; /* 10px -> 0.71rem */
    text-align: center;
    cursor: pointer;
    &:hover {
        background-color: var(--color-white1, #fff);
    }
`;

export { DropButton, DropdownHeader, DropdownItem, DropdownList };
