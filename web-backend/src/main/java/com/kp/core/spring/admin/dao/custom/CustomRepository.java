package com.kp.core.spring.admin.dao.custom;

import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;
import java.util.Map;

public abstract class CustomRepository {
    @Autowired
    EntityManager entityManager;

    public EntityManager getEntityManager() {
        return entityManager;
    }

    public List query(String hql) {
        return getEntityManager().createQuery(hql).getResultList();
    }

    public List query(String hql, Map<String, Object> params) {
        Query q = getEntityManager().createQuery(hql);
        params.forEach((key, value) -> {
            q.setParameter(key, value);
        });
        return q.getResultList();
    }

    public Object querySingle(String hql) {
        return getEntityManager().createQuery(hql).getSingleResult();
    }

    public Object querySingle(String hql, Map<String, Object> params) {
        Query q = getEntityManager().createQuery(hql);
        params.forEach((key, value) -> {
            q.setParameter(key, value);
        });
        return q.getSingleResult();
    }
}
