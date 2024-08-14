import PretendardLight from 'pretendard/dist/web/static/woff2/Pretendard-Light.woff2';
import PretendardMedium from 'pretendard/dist/web/static/woff2/Pretendard-Medium.woff2';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
    
    ul, ol {
        list-style: none;
    }  

    button {
        all: unset;
        cursor: pointer;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url(${PretendardLight}) format('woff2');
        font-weight: 300; /* Light */
        font-display: swap;
    }

    @font-face {
        font-family: 'Pretendard';
        src: url(${PretendardMedium}) format('woff2');
        font-weight: 500; /* Medium */
        font-display: swap;
    }

    html {
        font-size: 14px; /* 1rem = 14px */
        font-family: 'Pretendard', sans-serif;
    }

    :root {
        /* 폰트 크기 */
        --font-title-h1: 2.29rem; /* 2.29 * 14px = 32.06px */
        --font-title-h2: 1.43rem; /* 1.43 * 14px = 20.02px */
        --font-title-h3: 1rem;    /* 1 * 14px = 14px */
        --font-title-h4: 0.86rem; /* 0.86 * 14px = 12.04px */
        --font-title-h5: 0.71rem; /* 0.71 * 14px = 9.94px */
        --font-title-h6: 0.57rem; /* 0.57 * 14px = 7.98px */
        --font-body-h1: 2.29rem;  /* 2.29 * 14px = 32.06px */
        --font-body-h2: 1.43rem;  /* 1.43 * 14px = 20.02px */
        --font-body-h3: 1rem;     /* 1 * 14px = 14px */
        --font-body-h4: 0.86rem;  /* 0.86 * 14px = 12.04px */
        --font-body-h5: 0.71rem;  /* 0.71 * 14px = 9.94px */
        --font-body-h6: 0.57rem;  /* 0.57 * 14px = 7.98px */

        /* 컬러 */
        --color-green3: #252F2C;
        --color-green2: #465A54;
        --color-green1: #3EC41D;
        --color-blue: #4C92C9;
        --color-red: #FF6A5F;
        --color-yellow: #F3F0A8;
        --color-white2: #F7F7EC; 
        --color-white1: #FFFFFF;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: 'Pretendard', sans-serif;
        font-weight: 500; /* Medium */
        color: var(--color-green3);
    }

    body, p, span, div, input, textarea {
        font-family: 'Pretendard', sans-serif;
        font-weight: 300; /* Light */
        color: var(--color-green3);
    }

    /* 기본 속성 제거 */
    input, textarea {
        border: none;
        outline: none;
        resize: none;
    }

    h1 {
        font-size: var(--font-title-h1);
    }

    h2 {
        font-size: var(--font-title-h2);
    }

    h3 {
        font-size: var(--font-title-h3);
    }

    h4 {
        font-size: var(--font-title-h4);
    }

    h5 {
        font-size: var(--font-title-h5);
    }

    h6 {
        font-size: var(--font-title-h6);
    }
`;

export default GlobalStyles;
