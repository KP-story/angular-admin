package com.kp.core.spring.admin;

import com.hazelcast.config.MapStoreConfig;
import com.hazelcast.core.HazelcastInstance;
import com.kp.core.spring.admin.caching.UserKeyCache;
import com.kp.core.spring.admin.caching.mapstore.RoleMapstore;
import com.kp.core.spring.admin.caching.mapstore.UserMapstore;
import com.kp.core.spring.admin.dao.AmUserRepository;
import com.kp.core.spring.admin.dao.SeResourceRepository;
import com.kp.core.spring.admin.dao.SeRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableConfigurationProperties(PropertiesWithJavaConfig.class)
@EnableTransactionManagement
@EnableCaching
public class AdminApplication implements CommandLineRunner {


    @Autowired

    private AmUserRepository amUserRepository;
    @Autowired

    private SeRoleRepository seRoleRepository;
    @Autowired

    private SeResourceRepository seResourceRepository;
    @Qualifier("hazelcastInstance")
    @Autowired
    private HazelcastInstance hazelcastInstance;
    @Autowired
    private UserKeyCache userKeyCache;

    public static void main(String[] args) {
        SpringApplication.run(AdminApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        MapStoreConfig mapStoreConfig = hazelcastInstance.getConfig().getMapConfig("usersCache").getMapStoreConfig();
        mapStoreConfig.setEnabled(true);
        mapStoreConfig.setInitialLoadMode(MapStoreConfig.InitialLoadMode.LAZY);
        UserMapstore userMapstore = new UserMapstore();
        userMapstore.setAmUserRepository(amUserRepository);
        userMapstore.setUserKeyCache(userKeyCache);
        mapStoreConfig.setImplementation(userMapstore);


        MapStoreConfig roleMapStoreCfg = hazelcastInstance.getConfig().getMapConfig("roles").getMapStoreConfig();
        roleMapStoreCfg.setEnabled(true);
        roleMapStoreCfg.setInitialLoadMode(MapStoreConfig.InitialLoadMode.LAZY);
        RoleMapstore roleMapstore = new RoleMapstore();
        roleMapstore.setSeRoleRepository(seRoleRepository);
        roleMapStoreCfg.setImplementation(roleMapstore);

    }
}
