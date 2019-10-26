package com.kp.core.spring.admin.services.impl;

import com.kp.core.spring.admin.services.abs.AbstractSeRoleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeRoleServiceImpl extends AbstractSeRoleService {
    @Override
    public void deleteByIds(List<String> ids) {
        repository.deleteByIds(ids);
    }
}