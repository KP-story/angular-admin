package com.kp.core.spring.admin.controller.impl;

import com.k.common.data.vo.VObject;
import com.kp.core.spring.admin.caching.RoleCache;
import com.kp.core.spring.admin.constants.*;
import com.kp.core.spring.admin.controller.BaseControler;
import com.kp.core.spring.admin.dao.SePermissionRepository;
import com.kp.core.spring.admin.entities.SeOperation;
import com.kp.core.spring.admin.entities.SePermission;
import com.kp.core.spring.admin.entities.SeResource;
import com.kp.core.spring.admin.entities.SeRole;
import com.kp.core.spring.admin.services.abs.AbstractSePermissionService;
import com.kp.core.spring.admin.services.abs.AbstractSeResourceService;
import com.kp.core.spring.admin.services.abs.AbstractSeRoleService;
import com.kp.core.spring.admin.utilities.DateUtils;
import com.kp.core.spring.admin.vo.ResponseMsg;
import com.kp.core.spring.admin.vo.RestMessage;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SePermissionController extends BaseControler<SePermission, String, SePermissionRepository, AbstractSePermissionService> {
    private String PERMISSION_SEPARATOR = ":";

    @Autowired
    private AbstractSeResourceService seResourceService;
    @Autowired
    private AbstractSeRoleService seRoleService;
    @Autowired
    private RoleCache roleCache;

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/sePermission/list", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.ROLE + BaseOperations.KING, AppResources.ROLE + BaseOperations.S}, logical = Logical.OR)

    public ResponseMsg getSePermissions(Pageable pageable) throws Exception {
        return findAll(pageable);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/sePermission/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.ROLE + BaseOperations.KING, AppResources.ROLE + BaseOperations.S}, logical = Logical.OR)

    public ResponseMsg getDetailSePermission(@PathVariable("id") java.lang.String id) throws Exception {
        return super.getById(id);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/sePermission", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.ROLE + BaseOperations.KING, AppResources.ROLE + BaseOperations.I}, logical = Logical.OR)

    public ResponseMsg addSePermission(@Valid @RequestBody SePermission sePermission) {

        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {

            sePermission.setCreatedTime(DateUtils.now());
            sePermission.setStatus(Status.ACTIVE);
            List<SeResource> resources = seResourceService.findHierarchicalParent(sePermission.getSeResourceByResource().getName());

            if (resources.isEmpty()) {

                response = ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST, RestMessage.newDetailError(ResultCode.Code.RESOURCES_NOT_EXIST));


            } else {
                String name = "";
                for (int i = resources.size() - 1; i >= 0; i--) {
                    name = name + PERMISSION_SEPARATOR + resources.get(i).getName();
                }
                if (name.length() > 1) {
                    name = name.substring(1);
                }
                sePermission.setName(name + PERMISSION_SEPARATOR + sePermission.getSeOperation().getCode());
                return create(sePermission);

            }

        } catch (Exception e) {
            if (e instanceof JpaObjectRetrievalFailureException) {
                response = ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST);
                getLogger().error("failed {} error", sePermission, e);
            }
        }
        getLogger().info("done {}", response);
        return response;

    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/sePermission/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.ROLE + BaseOperations.KING, AppResources.ROLE + BaseOperations.U}, logical = Logical.OR)

    public ResponseMsg updateSePermission(@PathVariable("id") java.lang.String id, @Valid @RequestBody SePermission sePermission) throws Exception {
        return super.update(id, sePermission);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/sePermission/{id}", method = RequestMethod.DELETE, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.ROLE + BaseOperations.KING, AppResources.ROLE + BaseOperations.D}, logical = Logical.OR)

    public ResponseMsg deleteSePermission(@PathVariable("id") java.lang.String id) {
        return super.delete(id);
    }

    @Override
    public void merge(SePermission newBean, SePermission currentBean) {


    }


    @RequiresPermissions(value = {AppResources.ROLE + BaseOperations.KING, AppResources.ROLE + BaseOperations.U}, logical = Logical.OR)
    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/sePermission/grant", method = RequestMethod.POST)
    public ResponseMsg grantPermissionRole(@RequestBody RestMessage request) throws AuthenticationException {
        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {
            SeRole seRole;

            VObject role = request.getAndCastVObject(FieldNames.ROLE);
            String roleName = role.getString(FieldNames.NAME);
            seRole = seRoleService.findById(roleName);
            if (seRole == null) {
                response = ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST, RestMessage.newDetailError(ResultCode.Code.ROLE_NOT_EXIST));

            } else {
                List<SePermission> sePermissionEntities = new ArrayList<>();
                List<String> permissions = role.getVArray(FieldNames.PERMISSIONS);
                for (String permision : permissions) {
                    SePermission sePermission = new SePermission();
                    sePermission.setName(permision);

                    sePermissionEntities.add(sePermission);
                }
                seRole.addPermissions(sePermissionEntities);
                SeRole savedRoleEntity = seRoleService.save(seRole);

                if (savedRoleEntity != null) {
                    response = ResponseMsg.newOKResponse();
                    roleCache.remove(seRole.getName());


                }
            }

        } catch (Exception e) {
            if (e instanceof InvalidDataAccessApiUsageException) {
                response = ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST);
            }
            getLogger().error("failed {} error", request, e);
        }
        getLogger().info("done {}", response);
        return response;
    }


    @RequiresPermissions(value = {AppResources.ROLE + BaseOperations.KING, AppResources.ROLE + BaseOperations.U}, logical = Logical.OR)

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/sePermission/revoke", method = RequestMethod.POST)
    public ResponseMsg revokePermissionRole(@RequestBody RestMessage request) throws AuthenticationException {

        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {
            SeRole seRole;

            VObject role = request.getAndCastVObject(FieldNames.ROLE);
            String roleName = role.getString(FieldNames.NAME);
            seRole = seRoleService.findById(roleName);

            if (seRole == null) {
                response = ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST, RestMessage.newDetailError(ResultCode.Code.ROLE_NOT_EXIST));

            } else {
                List<String> permissions = role.getVArray(FieldNames.PERMISSIONS);
                for (String permision : permissions) {
                    SePermission sePermission = new SePermission();
                    sePermission.setName(permision);
                    seRole.getPermissions().remove(sePermission);

                }

                SeRole savedRoleEntity = seRoleService.save(seRole);

                if (savedRoleEntity != null) {
                    response = ResponseMsg.newOKResponse();
                    roleCache.remove(roleName);


                }
            }

        } catch (Exception e) {
            if (e instanceof InvalidDataAccessApiUsageException) {
                response = ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST);
            }
            getLogger().error("failed {} error", request, e);
        }
        getLogger().info("done {}", response);
        return response;
    }


    @RequiresPermissions(value = {AppResources.ROLE + BaseOperations.KING, AppResources.ROLE + BaseOperations.U}, logical = Logical.OR)
    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/sePermission/create_grant", method = RequestMethod.POST)
    public ResponseMsg createAndGrantPermission(@RequestBody RestMessage request) throws AuthenticationException {

        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {

            String role = request.getString(FieldNames.ROLE);
            List<String> actions = request.getVArray(FieldNames.OPERATIONS);
            String resourceName = request.getString(FieldNames.RESOURCE);
            boolean recursive = request.getBoolean(FieldNames.RECURSIVE);
            List<String> resources;
            if (recursive) {

                resources = seResourceService.findHierarchicalChildren(resourceName);
            } else {
                resources = new ArrayList<>();
                resources.add(resourceName);

            }
            List<SePermission> permissionEntityList = new ArrayList<>();

            for (String name : resources) {
                List<SeResource> parents = seResourceService.findHierarchicalParent(name);
                if (!parents.isEmpty()) {
                    String permisionName = "";
                    for (int i = parents.size() - 1; i >= 0; i--) {
                        permisionName = permisionName + PERMISSION_SEPARATOR + parents.get(i).getName();
                    }
                    if (name.length() > 1) {
                        permisionName = permisionName.substring(1);
                    }
                    for (String action : actions) {
                        SePermission sePermission = new SePermission();
                        sePermission.setName(permisionName + PERMISSION_SEPARATOR + action);
                        sePermission.setCreatedTime(DateUtils.now());
                        sePermission.setStatus(Status.ACTIVE);
                        SeOperation seOperation = new SeOperation();
                        seOperation.setCode(action);
                        SeResource seResource = new SeResource();
                        seResource.setName(name);
                        sePermission.setSeOperation(seOperation);
                        sePermission.setSeResourceByResource(seResource);
                        permissionEntityList.add(sePermission);
                    }

                }


            }
            List<SePermission> savedSePermissonEntities = new LinkedList<>();
            Iterable<SePermission> sePermissions = getService().saveAll(permissionEntityList);
            sePermissions.forEach(savedSePermissonEntities::add);
            if (savedSePermissonEntities != null && !savedSePermissonEntities.isEmpty() || actions.isEmpty()) {
                SeRole seRole = seRoleService.findById(role);
                if (seRole == null) {
                    response = ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST, RestMessage.newDetailError(ResultCode.Code.ROLE_NOT_EXIST));

                } else {
                    for (String name : resources) {
                        removeAllPermissionOnResource(seRole, name);
                    }
                    seRole.getPermissions().addAll(savedSePermissonEntities);
                    SeRole savedRoleEntity = seRoleService.save(seRole);

                    if (savedRoleEntity != null) {
                        response = ResponseMsg.newOKResponse();
                        roleCache.remove(seRole.getName());

                    }


                }
            }
        } catch (Exception e) {
            if (e instanceof JpaObjectRetrievalFailureException) {
                response = ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST);
            }
            getLogger().error("failed {} error", request, e);
        }
        getLogger().info("done {}", response);
        return response;
    }


    void removeAllPermissionOnResource(SeRole seRole, String resource) {
        if (seRole.getPermissions() != null) {

            Iterator itr = seRole.getPermissions().iterator();
            while (itr.hasNext()) {
                SePermission x = (SePermission) itr.next();
                if (x.getSeResourceByResource().getName().equals(resource)) {
                    itr.remove();
                }
            }


        }
    }

    @Override
    public String getBeanName() {
        return "sePermission";
    }
} 