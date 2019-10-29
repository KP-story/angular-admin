package com.kp.core.spring.admin.services;

import com.kp.core.spring.admin.dao.BaseRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface CURDService<Bean, ID, Repository extends BaseRepo<Bean, ID>> {

    Bean save(Bean bean) throws Exception;

    Iterable<Bean> saveAll(Iterable<Bean> beanIterable) throws Exception;

    boolean saveBean(Bean bean);

    boolean saveAllBeans(List<Bean> beans);

    boolean deleteById2(ID id);

    boolean deleteBean(Bean bean);

    boolean deleteAllBeans(List<? extends Bean> beans);
    void deleteAllBeansInBatch(List< Bean> beans);

    boolean deleteAll2();

    Bean findById(ID id) throws Exception;

    boolean existsById(ID id) throws Exception;

    Iterable<Bean> findAll() throws Exception;

    Iterable<Bean> findByObject(Bean bean) throws Exception;

    Page<Bean> findAll(Pageable pageable) throws Exception;

    Page<Bean> findByObject(Bean bean, Pageable pageable) throws Exception;

    Iterable<Bean> findAllById(Iterable<ID> ids) throws Exception;

    long count() throws Exception;

    void deleteById(ID id) throws Exception;

    void delete(Bean bean) throws Exception;

    void deleteAll(Iterable<? extends Bean> beans) throws Exception;

    void deleteAll() throws Exception;

    List<Bean> findAll(Sort sort);

    // using java predicate to find data
    Bean findOne(Specification<Bean> beanSpecification) throws Exception;

    List<Bean> findAll(Specification<Bean> beanSpecification) throws Exception;

    Page<Bean> findAll(Specification<Bean> beanSpecification, Pageable pageable) throws Exception;

    List<Bean> findAll(Specification<Bean> beanSpecification, Sort sort) throws Exception;

    long count(Specification<Bean> beanSpecification) throws Exception;
}
