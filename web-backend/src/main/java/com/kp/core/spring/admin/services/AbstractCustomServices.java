package com.kp.core.spring.admin.services;

import com.kp.core.spring.admin.dao.custom.CustomRepository;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AbstractCustomServices<Repository extends CustomRepository> implements CustomService {
    @Autowired
    private Repository repository;

    @Override
    public Repository getRepository() {
        return repository;
    }
}
