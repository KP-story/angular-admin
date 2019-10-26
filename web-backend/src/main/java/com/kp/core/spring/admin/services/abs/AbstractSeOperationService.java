package com.kp.core.spring.admin.services.abs;

import com.kp.core.spring.admin.dao.SeOperationRepository;
import com.kp.core.spring.admin.entities.SeOperation;
import com.kp.core.spring.admin.services.AbstractCRUDService;
import com.kp.core.spring.admin.services.SeOperationService;

public abstract class AbstractSeOperationService extends AbstractCRUDService<SeOperation, java.lang.String, SeOperationRepository> implements SeOperationService {
}