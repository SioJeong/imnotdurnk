import AsyncStorage from "@react-native-async-storage/async-storage";

// 로그아웃 처리 함수
const logout = async () => {
    try {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('expiryTime');
        const accessToken = await AsyncStorage.getItem('accessToken');
        const expiryTime = await AsyncStorage.getItem('expiryTime');
    } catch (error) {
    }
};

// Async Storage에 accessToken이 있는지, 그리고 만료되지 않았는지 확인
const checkLoginStatus = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const expiryTime = await AsyncStorage.getItem('expiryTime');
        if (!accessToken || !expiryTime) {
            return false; // 토큰이나 만료 시간이 없으면 로그아웃 상태로 간주
        }

        const currentTime = Date.now(); // 현재 시간 (밀리초)
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 하루를 밀리초로 변환
        const adjustedTime = currentTime - oneDayInMilliseconds; // 하루 전 시간
        
        if (adjustedTime >= parseInt(expiryTime, 10)) {
            // 토큰이 만료되었으면 로그아웃 처리
            await logout();
            return false; // 로그아웃 상태로 반환
        }

        return true; // 토큰이 있고, 만료되지 않았으면 로그인 상태
    } catch (error) {
        return false; // 오류가 발생하면 로그아웃 상태로 간주
    }
};

export { checkLoginStatus, logout };

