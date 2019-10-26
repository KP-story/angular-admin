package com.kp.core.spring.admin.services.impl;

import com.kp.core.spring.admin.entities.AmUser;
import com.kp.core.spring.admin.services.abs.AbstractAmUserService;
import com.kp.core.spring.admin.vo.dto.AmUserVo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AmUserServiceImpl extends AbstractAmUserService {
    @Override
    public Page<AmUserVo> searchUser(String username, String fullname, String phone, String email, int status, Pageable pageable) {
        return repository.searchUser(username, fullname, phone, email, status, pageable);
    }

    @Override
    public void deleteByUsernames(List<String> usernames) {
        repository.deleteByUsernames(usernames);
    }

    @Override
    public List<AmUser> findMultiUsers(List<String> usernames) {
        return repository.findMultiUsers(usernames);
    }

    @Override
    public List<String> fetchAllUserName() {
        return repository.fetchAllUserName();
    }

    @Override
    public AmUser findByUserName(String username) {
        return repository.findByUserName(username);
    }
}