import AsyncStorage from "@react-native-async-storage/async-storage";

// 로그아웃 처리 함수
const logout = async () => {
    try {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('expiryTime');
        console.log('로그아웃되었습니다.');
    } catch (error) {
        console.error('로그아웃 중 오류 발생:', error);
    }
};

// Async Storage에 accessToken이 있는지, 그리고 만료되지 않았는지 확인
const checkLoginStatus = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const expiryTime = await AsyncStorage.getItem('expiryTime');

        if (!token || !expiryTime) {
            return false; // 토큰이나 만료 시간이 없으면 로그아웃 상태로 간주
        }

        const currentTime = Date.now(); // 현재 시간 (밀리초)
        
        if (currentTime >= parseInt(expiryTime, 10)) {
            // 토큰이 만료되었으면 로그아웃 처리
            await logout();
            return false; // 로그아웃 상태로 반환
        }

        return true; // 토큰이 있고, 만료되지 않았으면 로그인 상태
    } catch (error) {
        console.error('Error checking login status:', error);
        return false; // 오류가 발생하면 로그아웃 상태로 간주
    }
};

export { checkLoginStatus, logout };

