package com.kp.core.spring.admin.services.abs;

import com.kp.core.spring.admin.dao.SeResourceRepository;
import com.kp.core.spring.admin.entities.SeResource;
import com.kp.core.spring.admin.services.AbstractCRUDService;
import com.kp.core.spring.admin.services.SeResourceService;

public abstract class AbstractSeResourceService extends AbstractCRUDService<SeResource, java.lang.String, SeResourceRepository> implements SeResourceService {
}