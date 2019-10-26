package com.kp.core.spring.admin.dao;

import com.kp.core.spring.admin.entities.SeRole;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SeRoleRepository extends BaseRepo<SeRole, java.lang.String> {
    @Modifying
    @Query("delete  from SeRole c where c.name in (:ids)")
    @Transactional
    void deleteByIds(@Param("ids") List<String> ids);

    @Query("select c.name from SeRole c")
    List<String> getAllNames();
}