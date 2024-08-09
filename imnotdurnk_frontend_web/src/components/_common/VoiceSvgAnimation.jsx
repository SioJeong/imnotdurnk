import * as St from './VoiceSvgAnimation.style';

const VoiceSvgAnimation = ({ $isRecording }) => (
    <St.SVGContainer $isRecording={$isRecording}>
        <svg
            width="140"
            height="140"
            viewBox="0 0 140 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <mask
                id="mask0_1299_1314"
                style={{ maskType: 'luminance' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="140"
                height="140"
            >
                <path
                    d="M70 134.167C105.439 134.167 134.167 105.439 134.167 70.0002C134.167 34.5609 105.439 5.8335 70 5.8335C34.5607 5.8335 5.83331 34.5609 5.83331 70.0002C5.83331 105.439 34.5607 134.167 70 134.167Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="10"
                />
                <path
                    className="line1"
                    d="M89.25 50.7503V89.2503"
                    stroke="black"
                    strokeWidth="10"
                    strokeLinecap="round"
                />
                <path
                    className="line2"
                    d="M108.5 63.5837V76.417"
                    stroke="black"
                    strokeWidth="10"
                    strokeLinecap="round"
                />
                <path
                    className="line3"
                    d="M50.75 50.7503V89.2503"
                    stroke="black"
                    strokeWidth="10"
                    strokeLinecap="round"
                />
                <path
                    className="line4"
                    d="M31.5 63.5837V76.417"
                    stroke="black"
                    strokeWidth="10"
                    strokeLinecap="round"
                />
                <path
                    className="line5"
                    d="M70 37.917V102.084"
                    stroke="black"
                    strokeWidth="10"
                    strokeLinecap="round"
                />
            </mask>
            <g mask="url(#mask0_1299_1314)">
                <path d="M-7 -7H147V147H-7V-7Z" fill="#252F2C" />
            </g>
        </svg>
    </St.SVGContainer>
);

export default VoiceSvgAnimation;
