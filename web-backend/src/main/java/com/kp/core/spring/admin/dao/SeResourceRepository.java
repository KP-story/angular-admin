package com.kp.core.spring.admin.dao;

import com.kp.core.spring.admin.entities.SeResource;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SeResourceRepository extends BaseRepo<SeResource, java.lang.String> {
    @Query("select  c from SeResource c where c.seResourceByParent is null")
    List<SeResource> findRoot();


    @Query(value = "WITH temp_table(name, parent,status,created_time) AS\n" +
            "(\n" +
            "SELECT name, parent,status,created_time FROM se_resource WHERE name =?1\n" +
            "UNION ALL\n" +
            "SELECT S2.name, S2.parent,S2.status,S2.created_time FROM temp_table S1 INNER JOIN se_resource S2 ON S1.parent = S2.name\n" +
            ")\n" +
            "SELECT name, parent,status,created_time FROM temp_table;", nativeQuery = true)
    List<SeResource> findHierarchicalParent(String name);


    @Query(value = "WITH temp_table(name, parent,status,created_time) AS\n" +
            "(\n" +
            "SELECT name, parent,status,created_time FROM se_resource WHERE name =?1\n" +
            "UNION ALL\n" +
            "SELECT S2.name, S2.parent,S2.status,S2.created_time FROM temp_table S1 INNER JOIN se_resource S2 ON S1.name = S2.parent\n" +
            ")\n" +
            "SELECT name FROM temp_table;", nativeQuery = true)
    List<String> findHierarchicalChildren(String name);

    @Modifying
    @Query("delete  from SeResource c where c.name in (:ids)")
    @Transactional
    void deleteById(@Param("ids") List<String> ids);
}