package com.kp.core.spring.admin.dao;

import com.kp.core.spring.admin.entities.SePermission;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SePermissionRepository extends BaseRepo<SePermission, java.lang.String> {
    @Modifying
    @Query("delete  from SePermission c where c.seResourceByResource.name in (:ids)")
    @Transactional
    void deleteAllOfResource(@Param("ids") List<String> ids);

    @Modifying
    @Query("delete  from SePermission c where c.seOperation.code in (:ids)")
    @Transactional
    void deleteAllOfOperations(@Param("ids") List<String> ids);
}