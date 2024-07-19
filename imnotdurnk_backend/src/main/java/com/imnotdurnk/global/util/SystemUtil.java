package com.imnotdurnk.global.util;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class SystemUtil {

    /**
     * 랜덤문자열 생성함수:
     * 자릿수(length) 만큼 랜덤한 숫자 + 문자 조합을 대문자/소문자에 따라 반환 받습니다.
     *
     * @param length      자릿수
     * @param isUpperCase 대문자 여부
     * @return 랜덤한 숫자 + 문자 조합의 문자열
     */
    public static String generateRandomMixStr(int length, boolean isUpperCase) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }
        return isUpperCase ? sb.toString() : sb.toString().toLowerCase();
    }

    /**
     * 주어진 객체의 모든 null 속성 이름을 가져옴
     * 객체를 복사할 때 null 값을 무시하기 위해서 사용
     *
     * @param source null 속성 정보를 검사할 객체
     * @return 소스 객체에서 null 값을 가진 속성 이름의 배열
     */
    public static String[] getNullPropertyNames (Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<String>();
        for(java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }

        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }

}
