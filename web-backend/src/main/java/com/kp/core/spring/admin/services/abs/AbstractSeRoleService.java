package com.kp.core.spring.admin.services.abs;

import com.kp.core.spring.admin.dao.SeRoleRepository;
import com.kp.core.spring.admin.entities.SeRole;
import com.kp.core.spring.admin.services.AbstractCRUDService;
import com.kp.core.spring.admin.services.SeRoleService;

public abstract class AbstractSeRoleService extends AbstractCRUDService<SeRole, String, SeRoleRepository> implements SeRoleService {
}