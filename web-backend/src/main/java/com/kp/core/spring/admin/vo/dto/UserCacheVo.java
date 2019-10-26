package com.kp.core.spring.admin.vo.dto;

import com.kp.core.spring.admin.entities.AmUser;
import com.kp.core.spring.admin.entities.SeRole;

import java.io.Serializable;
import java.math.BigInteger;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class UserCacheVo implements Serializable {
    private int userId;
    private String password;
    private BigInteger status;
    private String username;
    private Date modifiedPassword;
    private String ephemeralKey;
    private List<String> roles = new ArrayList<>();

    public static UserCacheVo valueOf(AmUser amUser, String ephemeralKey) {

        UserCacheVo amUserVo = new UserCacheVo();
        amUserVo.setPassword(amUser.getPassword());
        amUserVo.setStatus(amUser.getStatus());
        amUserVo.setEphemeralKey(ephemeralKey);
        amUserVo.setUserId(amUser.getUserId());
        amUserVo.setUsername(amUser.getUsername());
        amUserVo.setModifiedPassword(amUser.getModifiedPassword());
        for (SeRole seRole : amUser.getSeRoleEntities()) {
            amUserVo.getRoles().add(seRole.getName());
        }
        return amUserVo;
    }

    public String getEphemeralKey() {
        return ephemeralKey;
    }

    public void setEphemeralKey(String ephemeralKey) {
        this.ephemeralKey = ephemeralKey;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public BigInteger getStatus() {
        return status;
    }

    public void setStatus(BigInteger status) {
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public Date getModifiedPassword() {
        return modifiedPassword;
    }

    public void setModifiedPassword(Date modifiedPassword) {
        this.modifiedPassword = modifiedPassword;
    }
}
