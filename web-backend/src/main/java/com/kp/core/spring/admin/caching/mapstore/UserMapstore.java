package com.kp.core.spring.admin.caching.mapstore;

import com.hazelcast.core.MapStore;
import com.kp.core.spring.admin.caching.UserKeyCache;
import com.kp.core.spring.admin.dao.AmUserRepository;
import com.kp.core.spring.admin.entities.AmUser;
import com.kp.core.spring.admin.vo.dto.UserCacheVo;

import java.util.*;


public class UserMapstore implements MapStore<String, UserCacheVo> {

    AmUserRepository amUserRepository;
    UserKeyCache userKeyCache;

    public void setAmUserRepository(AmUserRepository amUserRepository) {
        this.amUserRepository = amUserRepository;
    }
//
//             public AmUserRepository getAmUserRepository() {
//                 return amUserRepository;
//             }
//             @Autowired
//
//             public void setAmUserRepository(AmUserRepository amUserRepository) {
//                 this.amUserRepository = amUserRepository;
//             }

    @Override
    public void store(String key, UserCacheVo value) {
//        amUserRepository.save(value);
    }

    @Override
    public void storeAll(Map<String, UserCacheVo> map) {

    }

    @Override
    public void delete(String key) {
//        amUserRepository.deleteByUsernames(Arrays.asList(key));

    }

    @Override
    public void deleteAll(Collection<String> keys) {
//        amUserRepository.deleteByUsernames(new ArrayList<>(keys));

    }

    public void setUserKeyCache(UserKeyCache userKeyCache) {
        this.userKeyCache = userKeyCache;
    }

    @Override
    public UserCacheVo load(String key) {
        System.out.println("tim trong db");

        AmUser amUser = amUserRepository.findByUserName(key);
        if (amUser != null) {
            UserCacheVo amUserVo = UserCacheVo.valueOf(amUser, userKeyCache.getUserKey(key));
            return amUserVo;

        }
        return null;
    }

    @Override
    public Map<String, UserCacheVo> loadAll(Collection<String> keys) {
        List<AmUser> amUserEntities = amUserRepository.findMultiUsers(new ArrayList<>(keys));
        Map<String, UserCacheVo> maps = new HashMap<>();
        for (AmUser amUser : amUserEntities) {
            UserCacheVo amUserVo = UserCacheVo.valueOf(amUser, userKeyCache.getUserKey(amUser.getUsername()));
            maps.put(amUser.getUsername(), amUserVo);
        }
        return maps;
    }

    @Override
    public Iterable<String> loadAllKeys() {
        return null;
    }


}
