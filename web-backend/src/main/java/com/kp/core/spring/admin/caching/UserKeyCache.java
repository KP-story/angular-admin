package com.kp.core.spring.admin.caching;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class UserKeyCache {
    @Cacheable(value = "userKey", key = "#username")

    public String getUserKey(String username) {
        return RandomStringUtils.randomAlphanumeric(7);
    }

    @CacheEvict(value = "userKey", key = "#username")

    public void remove(String username) {

    }
}
