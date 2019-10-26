package com.kp.core.spring.admin.dao;

import com.kp.core.spring.admin.entities.SeOperation;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SeOperationRepository extends BaseRepo<SeOperation, java.lang.String> {
    @Query("select  c from SeOperation c where(:name is null or c.name = :name) "
            + "and c.status =1 ")
    List<SeOperation> searchByName(@Param("name") String name);


    @Modifying
    @Query("delete  from SeOperation c where c.code in (:ids)")
    @Transactional
    void deleteById(@Param("ids") List<String> ids);
}