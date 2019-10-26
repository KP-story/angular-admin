package com.kp.core.spring.admin.controller.impl;

import com.kp.core.spring.admin.caching.RoleCache;
import com.kp.core.spring.admin.caching.UserCache;
import com.kp.core.spring.admin.constants.AppResources;
import com.kp.core.spring.admin.constants.BaseOperations;
import com.kp.core.spring.admin.constants.FieldNames;
import com.kp.core.spring.admin.constants.ResultCode;
import com.kp.core.spring.admin.controller.BaseControler;
import com.kp.core.spring.admin.dao.SeRoleRepository;
import com.kp.core.spring.admin.entities.AmUser;
import com.kp.core.spring.admin.entities.SePermission;
import com.kp.core.spring.admin.entities.SeRole;
import com.kp.core.spring.admin.services.abs.AbstractAmUserService;
import com.kp.core.spring.admin.services.abs.AbstractSeRoleService;
import com.kp.core.spring.admin.vo.ResponseMsg;
import com.kp.core.spring.admin.vo.RestMessage;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SeRoleController extends BaseControler<SeRole, String, SeRoleRepository, AbstractSeRoleService> {


    @Autowired
    private UserCache userCaching;
    @Autowired
    private RoleCache roleCache;
    @Autowired
    private AbstractAmUserService amUserService;

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seRole/list", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.ROLE + BaseOperations.KING, AppResources.ROLE + BaseOperations.S}, logical = Logical.OR)

    public ResponseMsg getSeRoles(Pageable pageable) throws Exception {
        return findAll(pageable);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seRole/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.ROLE + BaseOperations.KING, AppResources.ROLE + BaseOperations.S}, logical = Logical.OR)

    public ResponseMsg getDetailSeRole(@PathVariable("id") java.lang.String id) throws Exception {
        return super.getById(id);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seRole", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.ROLE + BaseOperations.KING, AppResources.ROLE + BaseOperations.I}, logical = Logical.OR)

    public ResponseMsg addSeRole(@Valid @RequestBody SeRole seRole) {
        return create(seRole);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seRole/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.ROLE + BaseOperations.KING, AppResources.ROLE + BaseOperations.U}, logical = Logical.OR)

    public ResponseMsg updateSeRole(@PathVariable("id") java.lang.String id, @Valid @RequestBody SeRole seRole) throws Exception {
        return super.update(id, seRole);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seRole/{id}", method = RequestMethod.DELETE, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.ROLE + BaseOperations.KING, AppResources.ROLE + BaseOperations.D}, logical = Logical.OR)

    public ResponseMsg deleteSeRole(@PathVariable("id") java.lang.String id) {

        roleCache.remove(id);
        return super.delete(id);
    }


    @RequiresPermissions(value = {AppResources.ROLE + BaseOperations.KING, AppResources.ROLE + BaseOperations.U}, logical = Logical.OR)
    @RequiresRoles("admin")
    @RequestMapping(value = "/seRole/assign", method = RequestMethod.POST)
    public ResponseMsg assignRole(@RequestBody RestMessage request) throws AuthenticationException {

        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {
            SeRole seRole;

            String roleName = request.getString(FieldNames.ROLE);
            String username = request.getString(FieldNames.USERNAME);
            AmUser amUser = amUserService.findByUserName(username);
            seRole = getService().findById(roleName);
            if (seRole == null || amUser == null) {
                response = ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST);

            } else {
                amUser.addSeRoleEntities(seRole);

                AmUser saved = amUserService.save(amUser);

                if (saved != null) {
                    userCaching.removeUser(username);

                    response = ResponseMsg.newOKResponse();
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

    @RequestMapping(value = "/seRole/changeRoleOfUser", method = RequestMethod.POST)
    public ResponseMsg changeRoleOfUser(@RequestBody RestMessage request) throws AuthenticationException {

        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {
            SeRole seRole;

            List<String> roles = request.getVArray(FieldNames.ROLES);
            String username = request.getString(FieldNames.USERNAME);
            List<SeRole> roleEntities = new LinkedList<>();
            if (!roles.isEmpty()) {
                Iterable<SeRole> allById = getService().findAllById(roles);
                allById.forEach(roleEntities::add);

                if (roleEntities.isEmpty()) {
                    response = ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST, RestMessage.newDetailError(ResultCode.Code.ROLE_NOT_EXIST));
                    return response;
                }

            }
            AmUser amUser = amUserService.findByUserName(username);

            if (amUser == null) {
                response = ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST, RestMessage.newDetailError(ResultCode.Code.USER_NOT_EXIST));

            } else {
                amUser.getSeRoleEntities().clear();
                amUser.setSeRoleEntities(roleEntities);
                AmUser saved = amUserService.save(amUser);
                if (saved != null) {
                    userCaching.removeUser(username);
                    response = ResponseMsg.newOKResponse();

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
    @RequestMapping(value = "/seRole/revokeRole", method = RequestMethod.POST)
    public ResponseMsg revokeRole(@RequestBody RestMessage request) throws AuthenticationException {

        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {


            SeRole seRole;

            String roleName = request.getString(FieldNames.ROLE);
            String username = request.getString(FieldNames.USERNAME);
            AmUser amUser = amUserService.findByUserName(username);
            seRole = getService().findById(roleName);
            if (seRole == null || amUser == null) {
                response = ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST);

            } else {

                amUser.getSeRoleEntities().remove(seRole);
                AmUser saved = amUserService.save(amUser);

                if (saved != null) {
                    userCaching.removeUser(username);

                    response = ResponseMsg.newOKResponse();
                }
            }
        } catch (Exception e) {

            getLogger().error("failed {} error", request, e);
        }
        getLogger().info("done {}", response);
        return response;
    }


    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seRole/fetchUserRoles", method = RequestMethod.GET)
    public ResponseMsg fetchRolePermissonsByUser(@RequestParam String username) throws AuthenticationException {

        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {
            AmUser amUser = amUserService.findByUserName(username);
            if (amUser != null) {

                response = ResponseMsg.newOKResponse(getBeanName(), amUser.getSeRoleEntities());

            } else {
                response = ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST, RestMessage.newDetailError(ResultCode.Code.USER_NOT_EXIST));

            }
        } catch (Exception e) {

            getLogger().error("failed {} error", username, e);
        }
        getLogger().info("done {}", response);
        return response;
    }


    @RequiresPermissions(value = {AppResources.ROLE + BaseOperations.KING, AppResources.ROLE + BaseOperations.D}, logical = Logical.OR)
    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "seRole/multiple/delete", method = RequestMethod.POST)
    public ResponseMsg deleteRoles(@RequestBody List<String> roles) throws AuthenticationException {

        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {

            getService().deleteByIds(roles);
            response = ResponseMsg.newOKResponse();

            userCaching.removeAll();
            roleCache.removeMulti(roles);
        } catch (Exception e) {
            if (e instanceof DataIntegrityViolationException) {
                response = ResponseMsg.newResponse(ResultCode.OBJECT_HAS_RELATIONSHIPS);
            }
            getLogger().error("failed {} error", roles, e);
        }
        getLogger().info("done {}", response);
        return response;
    }


    @Override
    public void merge(SeRole newBean, SeRole currentBean) {

        currentBean.setStatus(newBean.getStatus());

        currentBean.setName(newBean.getName());
        if (newBean.getPermissions() != null && !newBean.getPermissions().isEmpty()) {

            List<SePermission> permissions = newBean.getPermissions();
            currentBean.setPermissions(permissions);
        }
    }

    @Override
    public String getBeanName() {
        return "seRole";
    }
} 