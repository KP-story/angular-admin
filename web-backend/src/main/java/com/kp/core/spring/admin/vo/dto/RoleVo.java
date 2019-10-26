package com.kp.core.spring.admin.vo.dto;

import com.kp.core.spring.admin.entities.SeRole;
import com.kp.core.spring.admin.utilities.UserUtils;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

public class RoleVo implements Serializable {
    List<String> permissions = new ArrayList<>();
    private String name;
    private BigInteger status;

    public static RoleVo valueOf(SeRole seRole) {
        RoleVo roleVo = new RoleVo();

        roleVo.setName(seRole.getName());
        roleVo.setStatus(seRole.getStatus());

        roleVo.getPermissions().addAll(UserUtils.getPermissionOfRole(seRole));
        return roleVo;

    }

    public List<String> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<String> permissions) {
        this.permissions = permissions;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigInteger getStatus() {
        return status;
    }

    public void setStatus(BigInteger status) {
        this.status = status;
    }
}
