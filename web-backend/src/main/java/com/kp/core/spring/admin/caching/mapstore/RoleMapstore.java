package com.kp.core.spring.admin.caching.mapstore;

import com.hazelcast.core.MapStore;
import com.kp.core.spring.admin.dao.SeRoleRepository;
import com.kp.core.spring.admin.entities.SeRole;
import com.kp.core.spring.admin.vo.dto.RoleVo;

import java.util.*;


public class RoleMapstore implements MapStore<String, RoleVo> {

    SeRoleRepository seRoleRepository;

    public SeRoleRepository getSeRoleRepository() {
        return seRoleRepository;
    }

    public void setSeRoleRepository(SeRoleRepository seRoleRepository) {
        this.seRoleRepository = seRoleRepository;
    }

    @Override
    public void store(String s, RoleVo roleVo) {

    }

    @Override
    public void storeAll(Map<String, RoleVo> map) {

    }

    @Override
    public void delete(String s) {

    }

    @Override
    public void deleteAll(Collection<String> collection) {

    }

    @Override
    public RoleVo load(String s) {
        Optional<SeRole> seRoleEntity = seRoleRepository.findById(s);
        if (seRoleEntity != null) {
            return RoleVo.valueOf(seRoleEntity.get());
        }
        return null;
    }

    @Override
    public Map<String, RoleVo> loadAll(Collection<String> collection) {
        Map<String, RoleVo> roleVoMap = new HashMap<>();
        List<SeRole> seRoleEntities = seRoleRepository.findAll();
        for (SeRole seRole : seRoleEntities) {
            RoleVo roleVo = RoleVo.valueOf(seRole);
            roleVoMap.put(seRole.getName(), roleVo);
        }
        return roleVoMap;
    }

    @Override
    public Iterable<String> loadAllKeys() {
        return null;
    }
}
