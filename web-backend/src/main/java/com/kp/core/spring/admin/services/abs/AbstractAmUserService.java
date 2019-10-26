package com.kp.core.spring.admin.services.abs;

import com.kp.core.spring.admin.dao.AmUserRepository;
import com.kp.core.spring.admin.entities.AmUser;
import com.kp.core.spring.admin.services.AbstractCRUDService;
import com.kp.core.spring.admin.services.AmUserService;

public abstract class AbstractAmUserService extends AbstractCRUDService<AmUser, Integer, AmUserRepository> implements AmUserService {

}