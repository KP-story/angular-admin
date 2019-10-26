package com.kp.core.spring.admin.services.impl;

import com.kp.core.spring.admin.entities.SeResource;
import com.kp.core.spring.admin.services.abs.AbstractSeResourceService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeResourceServiceImpl extends AbstractSeResourceService {
    @Override
    public List<SeResource> findRoot() {
        return repository.findRoot();
    }

    @Override
    public List<SeResource> findHierarchicalParent(String name) {
        return repository.findHierarchicalParent(name);
    }

    @Override
    public List<String> findHierarchicalChildren(String name) {
        return repository.findHierarchicalChildren(name);
    }

    @Override
    public void deleteById(List<String> ids) {
        repository.deleteById(ids);

    }
}