package com.kp.core.spring.admin.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseRepo<Bean, ID> extends JpaSpecificationExecutor<Bean>, JpaRepository<Bean, ID> {
}
