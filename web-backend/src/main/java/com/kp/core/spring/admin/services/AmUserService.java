package com.kp.core.spring.admin.services;

import com.kp.core.spring.admin.entities.AmUser;
import com.kp.core.spring.admin.vo.dto.AmUserVo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AmUserService {
    Page<AmUserVo> searchUser(String username, String fullname, String phone, String email, int status, Pageable pageable);

    void deleteByUsernames(List<String> usernames);

    List<AmUser> findMultiUsers(List<String> usernames);

    List<String> fetchAllUserName();

    AmUser findByUserName(String username);


}