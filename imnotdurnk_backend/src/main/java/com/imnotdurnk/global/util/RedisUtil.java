package com.imnotdurnk.global.util;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
@RequiredArgsConstructor
public class RedisUtil {

    private final StringRedisTemplate stringRedisTemplate;

    /**
     * Redis 저장소에서 지정된 키에 해당하는 값을 가져옴
     *
     * @param key 값을 가져올 키
     * @return 지정된 키에 해당하는 값, 키가 존재하지 않는 경우 null
     */
    public String getData(String key) {
        ValueOperations<String,String> valueOperations = stringRedisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    /**
     * Redis 저장소에 지정된 키-값 쌍을 저장함
     *
     * @param key   저장할 키
     * @param value 저장할 값
     * */
    public void setData(String key, String value) {
        ValueOperations<String,String> valueOperations = stringRedisTemplate.opsForValue();
        valueOperations.set(key, value);
    }

    /**
     * Redis 저장소에 지정된 키-값 쌍을 저장하고, 해당 데이터의 만료 시간을 설정함
     *
     * @param key       저장할 키
     * @param value     저장할 값
     * @param duration  데이터 만료 시간 (초 단위)
     * */
    public void setDataExpire(String key, String value, long duration) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, value, expireDuration);
    }

    /**
     * Redis 저장소에서 지정된 키에 해당하는 데이터를 삭제함
     *
     * @param key 삭제할 데이터의 키
     */
    public void deleteData(String key) {
        stringRedisTemplate.delete(key);
    }

}
