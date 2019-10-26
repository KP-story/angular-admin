package com.kp.core.spring.admin.services;

import com.k.common.log.Loggable;
import com.kp.core.spring.admin.dao.BaseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public abstract class AbstractCRUDService<Bean, ID, Repository extends BaseRepo<Bean, ID>> implements CURDService<Bean, ID, Repository>, Loggable {

    @Autowired
    protected Repository repository;


//    private void saveActionAuditLog(Bean bean, ActionAudit actionAudit, List<AuditDTO> lstAuditDTO) throws Exception {
//        //Id (Auto increment) and create_time (default current_datetime)
//        actionAudit.setId(null);
//        actionAudit.setCreateDt(null);
//        ActionAudit rtActionAudit = actionAuditService.save(actionAudit);
//        actionAuditDtlService.saveLog(bean.getClass(), rtActionAudit.getId(), lstAuditDTO);
//    }

    @Override
    public Bean save(Bean bean) throws Exception {
        return repository.save(bean);
    }

    @Override
    public Iterable<Bean> saveAll(Iterable<Bean> beanIterable) throws Exception {
        return repository.saveAll(beanIterable);
    }

    @Override
    public boolean saveBean(Bean bean) {
        try {
            if (repository.save(bean) != null) {
                return true;
            }
        } catch (Exception e) {
            getLogger().error("save2", e);
        }
        return false;
    }

    @Override
    public boolean saveAllBeans(List<Bean> beans) {
        try {
            if (repository.saveAll(beans).size() == beans.size()) {
                return true;
            }
        } catch (Exception e) {
            getLogger().error("saveAll2", e);
        }
        return false;
    }

    @Override
    public boolean deleteById2(ID id) {
        try {
            repository.deleteById(id);
            return true;

        } catch (Exception e) {
            getLogger().error("deleteById2", e);
            return false;
        }
    }

    @Override
    public boolean deleteBean(Bean bean) {
        try {
            repository.delete(bean);
            return true;

        } catch (Exception e) {
            getLogger().error("delete2", e);
            return false;
        }
    }

    @Override
    public boolean deleteAllBeans(List<? extends Bean> beans) {
        try {
            repository.deleteAll(beans);
            return true;
        } catch (Exception e) {
            getLogger().error("deleteAll2", e);
            return false;
        }
    }

    @Override
    public boolean deleteAll2() {
        try {
            repository.deleteAll();
            return true;
        } catch (Exception e) {
            getLogger().error("deleteAll2", e);
            return false;
        }
    }


    @Override
    public Bean findById(ID id) throws Exception {
        return repository.findById(id).get();
    }

    @Override
    public Iterable<Bean> findByObject(Bean bean) throws Exception {
        Example<Bean> example = Example.of(bean, ExampleMatcher.matching());
        return repository.findAll(example);
    }

    @Override
    public Page<Bean> findByObject(Bean bean, Pageable pageable) throws Exception {
        Example<Bean> example = Example.of(bean, ExampleMatcher.matching());
        return repository.findAll(example, pageable);
    }

    @Override
    public boolean existsById(ID id) throws Exception {
        return repository.existsById(id);
    }

    @Override
    public Iterable<Bean> findAll() throws Exception {
        return repository.findAll();
    }

    @Override
    public Page<Bean> findAll(Pageable pageable) throws Exception {
        return repository.findAll(pageable);
    }

    @Override
    public Iterable<Bean> findAllById(Iterable<ID> idIterable) throws Exception {
        return repository.findAllById(idIterable);
    }

    @Override
    public long count() throws Exception {
        return repository.count();
    }

    @Override
    public void deleteById(ID id) throws Exception {
        repository.deleteById(id);

    }

    @Override
    public void delete(Bean bean) throws Exception {
        repository.delete(bean);

    }

    @Override
    public void deleteAll(Iterable<? extends Bean> beans) throws Exception {
        repository.deleteAll(beans);
    }

    @Override
    public void deleteAll() throws Exception {
        repository.deleteAll();

    }

    @Override
    public Bean findOne(Specification<Bean> beanSpecification) throws Exception {
        return repository.findOne(beanSpecification).get();
    }

    @Override
    public List<Bean> findAll(Specification<Bean> beanSpecification) throws Exception {
        return repository.findAll(beanSpecification);
    }

    @Override
    public Page<Bean> findAll(Specification<Bean> beanSpecification, Pageable pageable) throws Exception {
        return repository.findAll(beanSpecification, pageable);
    }

    @Override
    public List<Bean> findAll(Specification<Bean> beanSpecification, Sort sort) throws Exception {
        return repository.findAll(beanSpecification, sort);
    }

    @Override
    public long count(Specification<Bean> beanSpecification) throws Exception {
        return repository.count(beanSpecification);
    }

    @Override
    public List<Bean> findAll(Sort sort) {
        return repository.findAll(sort);
    }
}
