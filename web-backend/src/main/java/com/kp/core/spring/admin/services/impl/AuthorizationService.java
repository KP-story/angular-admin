package com.kp.core.spring.admin.services.impl;

import com.kp.core.spring.admin.dao.SeOperationRepository;
import com.kp.core.spring.admin.dao.SePermissionRepository;
import com.kp.core.spring.admin.dao.SeResourceRepository;
import com.kp.core.spring.admin.dao.SeRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AuthorizationService {
    @Autowired
    private SeOperationRepository seOperationRepository;
    @Autowired
    private SeResourceRepository seResourceRepository;
    @Autowired
    private SePermissionRepository sePermissionRepository;
    @Autowired
    private SeRoleRepository seRoleRepository;


    @Transactional
    public void excuteDeleteResources(List<String> resources) {
        sePermissionRepository.deleteAllOfResource(resources);
        seResourceRepository.deleteById(resources);

    }

    @Transactional
    public void excuteDeleteOperations(List<String> operations) {
        sePermissionRepository.deleteAllOfOperations(operations);
        seOperationRepository.deleteById(operations);

    }
}
