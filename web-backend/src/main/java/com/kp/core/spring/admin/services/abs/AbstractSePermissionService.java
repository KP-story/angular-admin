package com.kp.core.spring.admin.services.abs;

import com.kp.core.spring.admin.dao.SePermissionRepository;
import com.kp.core.spring.admin.entities.SePermission;
import com.kp.core.spring.admin.services.AbstractCRUDService;
import com.kp.core.spring.admin.services.SePermissionService;

public abstract class AbstractSePermissionService extends AbstractCRUDService<SePermission, String, SePermissionRepository> implements SePermissionService {
}