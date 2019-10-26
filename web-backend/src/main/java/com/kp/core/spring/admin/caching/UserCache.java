package com.kp.core.spring.admin.caching;

import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.IMap;
import com.kp.core.spring.admin.vo.dto.UserCacheVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Service
public class UserCache {
    Lock lock = new ReentrantLock();

    @Qualifier("hazelcastInstance")
    @Autowired
    HazelcastInstance hazelcastInstance;
    IMap<String, UserCacheVo> userImap;

    IMap<String, UserCacheVo> getUserImap() {
        if (userImap == null) {
            lock.lock();

            try {
                {
                    userImap = hazelcastInstance.getMap("usersCache");
                }
            } finally {

                lock.unlock();

            }

        }
        return userImap;
    }

    public UserCacheVo getByUsername(String name) {
        return getUserImap().get(name);
    }

    public void put(UserCacheVo user) {
        getUserImap().set(user.getUsername(), user);
    }

    public void removeUser(String name) {
        getUserImap().remove(name);

    }

    public void removeMultiUsers(List<String> names) {
        getUserImap().keySet().removeAll(names);

    }

    public void removeAll() {
        getUserImap().clear();
    }
}
