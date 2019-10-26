package com.kp.core.spring.admin.caching;

import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.IMap;
import com.kp.core.spring.admin.vo.dto.RoleVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Service
public class RoleCache {
    Lock lock = new ReentrantLock();

    @Qualifier("hazelcastInstance")
    @Autowired
    HazelcastInstance hazelcastInstance;
    IMap<String, RoleVo> map;

    IMap<String, RoleVo> getMap() {
        if (map == null) {
            lock.lock();

            try {
                {
                    if (map == null) {
                        map = hazelcastInstance.getMap("roles");
                    }
                }
            } finally {

                lock.unlock();

            }

        }
        return map;
    }

    public RoleVo get(String name) {
        return getMap().get(name);
    }

    public void remove(String name) {
        getMap().remove(name);

    }

    public void removeMulti(List<String> names) {
        getMap().keySet().removeAll(names);

    }

    public void removeAll() {
        getMap().clear();
    }
}
