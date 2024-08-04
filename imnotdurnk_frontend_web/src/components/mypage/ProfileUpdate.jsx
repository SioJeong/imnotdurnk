import InputBox from '@/components/_common/InputBox';
import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../services/user';
import MiniButton from '../_button/MiniButton';
import * as St from './Profile.style';
const ProfileUpdate = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'backarrow', path: -1 },
            title: '프로필 수정',
            icon2: { iconname: 'check', path: '/update' },
        });
    }, [setNavigation]);
    const [inputValues, setInputValues] = useState({
        name: '',
        nickname: '',
        email: '',
        phone: '',
        address: '',
        detailedAddress: '',
        postalCode: '',
        emergencyCall: '',
    });
    const navigate = useNavigate();
    const onClickPasswordChangeButton = () => {
        navigate('/find-password');
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target; // 입력값을 콘솔에 출력
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const getProfileResult = await getUserProfile(); // getUserProfile 함수 비동기 호출

                if (getProfileResult.isSuccess) {
                    // 사용자 정보를 inputValues에 업데이트
                    setInputValues({
                        name: getProfileResult.data.name,
                        nickname: getProfileResult.data.nickname,
                        email: getProfileResult.data.email,
                        phone: getProfileResult.data.phone,
                        address: getProfileResult.data.address,
                        detailedAddress: getProfileResult.data.detailedAddress,
                        postalCode: getProfileResult.data.postalCode,
                        emergencyCall: getProfileResult.data.emergencyCall,
                    });
                    console.log('프로필 가져옴', getProfileResult.data);
                } else {
                    console.log('프로필 가져오기 실패');
                    // 프로필 가져오기 실패 시 처리할 로직 추가 가능
                }
            } catch (error) {
                console.error('프로필 가져오기 중 오류 발생', error);
                // 오류 처리 로직 추가
            }
        };

        fetchUserProfile(); // useEffect에서 호출
    }, []);
    return (
        <>
            <St.ProfileContainer>
                <St.Title>{inputValues.nickname}님 안녕하세요!</St.Title>
                <St.InfoContainer>
                    <InputBox
                        labelText="이름"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.name}
                        name="name"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <InputBox
                        labelText="닉네임"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.nickname}
                        onChange={handleInputChange}
                        name="nickname"
                    />
                    <InputBox
                        labelText="이메일"
                        iconName="empty"
                        inputType="email"
                        value={inputValues.email}
                        name="email"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <InputBox
                        labelText="연락처"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.phone}
                        onChange={handleInputChange}
                        name="phone"
                    />
                    <St.AlcoholCapacityBox>
                        <St.StyledH6>주량</St.StyledH6>
                    </St.AlcoholCapacityBox>
                    <InputBox
                        labelText="주소"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.address}
                        name="address"
                        readOnly
                    />
                    <InputBox
                        labelText="상세 주소"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.detailedAddress}
                        onChange={handleInputChange}
                        name="detailedAddress"
                    />
                    <InputBox
                        labelText="우편번호"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.postalCode}
                        name="postalCode"
                        readOnly
                    />
                    <InputBox
                        labelText="비상 연락망"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.emergencyCall}
                        onChange={handleInputChange}
                        name="emergencyCall"
                    />
                    <St.VoiceBox>
                        <St.StyledH6>목소리</St.StyledH6>
                        <St.VoiceButton
                            src="/src/assets/icons/size_24/Icon-voice.svg"
                            alt="Voice"
                        />
                    </St.VoiceBox>
                </St.InfoContainer>
                <St.ButtonContainer>
                    <MiniButton text="회원탈퇴" iconname="bin" isRed={false} />
                    <MiniButton
                        text="로그아웃"
                        iconname="signout"
                        isRed={false}
                    />
                    <MiniButton
                        text="비밀번호 변경"
                        iconname="key"
                        isRed={true}
                        onClick={onClickPasswordChangeButton}
                    />
                </St.ButtonContainer>
            </St.ProfileContainer>
        </>
    );
};

export default ProfileUpdate;
