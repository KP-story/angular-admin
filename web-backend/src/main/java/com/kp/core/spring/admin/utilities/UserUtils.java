package com.kp.core.spring.admin.utilities;

import com.kp.core.spring.admin.caching.RoleCache;
import com.kp.core.spring.admin.constants.Status;
import com.kp.core.spring.admin.entities.AmUser;
import com.kp.core.spring.admin.entities.SePermission;
import com.kp.core.spring.admin.entities.SeResource;
import com.kp.core.spring.admin.entities.SeRole;
import com.kp.core.spring.admin.vo.dto.RoleVo;
import com.kp.core.spring.admin.vo.dto.UserCacheVo;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class UserUtils {
    public static List<String> getPermissionOfUser(AmUser amUser) {
        List<SeRole> roles = amUser.getSeRoleEntities();
        Iterator<SeRole> rolesIterator = roles.iterator();
        List<String> permissions = new ArrayList<>();
        while (rolesIterator.hasNext()) {
            SeRole seRole = rolesIterator.next();
            if (seRole.getStatus() == Status.ACTIVE) {
                List<SePermission> permissionEntities = seRole.getPermissions();
                if (permissionEntities != null) {
                    Iterator<SePermission> permissionEntityIterator = permissionEntities.iterator();
                    while (permissionEntityIterator.hasNext()) {
                        SePermission sePermission = permissionEntityIterator.next();
                        if (sePermission.getStatus() == Status.ACTIVE) {
                            if (sePermission.getSeOperation() != null && sePermission.getSeOperation().getStatus() == Status.ACTIVE) {
                                if (sePermission.getSeResourceByResource() != null) {
                                    if (checkRecersiveResourceActive(sePermission.getSeResourceByResource())) {

                                        permissions.add(sePermission.getName());
                                    }
                                }

                            }

                        }
                    }

                }

            }
        }

        return permissions;
    }

    public static boolean checkRecersiveResourceActive(SeResource seResource) {
        if (seResource.getStatus() == Status.ACTIVE) {
            if (seResource.getSeResourceByParent() != null) {
                return checkRecersiveResourceActive(seResource.getSeResourceByParent());
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    public static List<String> getPermissionOfUser(UserCacheVo amUserVo, RoleCache roleCache) {
        List<String> roles = amUserVo.getRoles();
        List<String> permissions = new ArrayList<>();

        if (roles != null) {
            for (String role : roles) {
                RoleVo roleVo = roleCache.get(role);
                if (roleVo != null && roleVo.getStatus().equals(Status.ACTIVE)) {
                    if (roleVo.getPermissions() != null) {
                        permissions.addAll(roleVo.getPermissions());
                    }
                }
            }

        }


        return permissions;
    }

    public static List<String> getPermissionOfRole(SeRole seRole) {
        List<String> permissions = new ArrayList<>();
        List<SePermission> permissionEntities = seRole.getPermissions();
        if (permissionEntities != null) {
            Iterator<SePermission> permissionEntityIterator = permissionEntities.iterator();
            while (permissionEntityIterator.hasNext()) {
                SePermission sePermission = permissionEntityIterator.next();
                if (sePermission.getStatus().equals(
                        Status.ACTIVE)) {
                    if (sePermission.getSeOperation() != null && sePermission.getSeOperation().getStatus().equals(Status.ACTIVE)) {
                        if (sePermission.getSeResourceByResource() != null) {
                            if (checkRecersiveResourceActive(sePermission.getSeResourceByResource())) {

                                permissions.add(sePermission.getName());
                            }
                        }

                    }

                }
            }

        }


        return permissions;
    }
}
