package com.kp.core.spring.admin.services;

import com.kp.core.spring.admin.entities.SeResource;

import java.util.List;

public interface SeResourceService {

    List<SeResource> findRoot();

    List<SeResource> findHierarchicalParent(String name);

    List<String> findHierarchicalChildren(String name);

    void deleteById(List<String> ids);
}