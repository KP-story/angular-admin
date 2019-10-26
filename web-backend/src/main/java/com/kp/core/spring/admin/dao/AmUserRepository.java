package com.kp.core.spring.admin.dao;

import com.kp.core.spring.admin.entities.AmUser;
import com.kp.core.spring.admin.vo.dto.AmUserVo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AmUserRepository extends BaseRepo<AmUser, java.lang.Integer> {
    @Query("select  c from AmUser c where c.username= :username")
    AmUser findByUserName(@Param("username") String username);

    @Query("select  c from AmUser c where(:username is null or c.username = :username) " +
            "and (:phone is null or c.phone = :phone) " +
            "and (:email is null or c.email = :email) " +
            "and (:fullname is null or c.fullname = :fullname) " +
            "and (:status =-1 or c.status = :status)  ")
    Page<AmUserVo> searchUser(@Param("username") String username, @Param("fullname") String fullname, @Param("phone") String phone, @Param("email") String email, @Param("status") int status, Pageable pageable);

    @Modifying
    @Query("delete  from AmUser c where c.username in (:usernames)")
    @Transactional
    void deleteByUsernames(@Param("usernames") List<String> usernames);

    @Query("select  c from AmUser c where c.username in (:usernames)")
    List<AmUser> findMultiUsers(@Param("usernames") List<String> usernames);

    @Query("select  username from AmUser ")
    List<String> fetchAllUserName();
}