package com.kp.core.spring.admin.controller.impl;

import com.kp.core.spring.admin.caching.RoleCache;
import com.kp.core.spring.admin.constants.AppResources;
import com.kp.core.spring.admin.constants.BaseOperations;
import com.kp.core.spring.admin.constants.ResultCode;
import com.kp.core.spring.admin.controller.BaseControler;
import com.kp.core.spring.admin.dao.SeOperationRepository;
import com.kp.core.spring.admin.entities.SeOperation;
import com.kp.core.spring.admin.services.abs.AbstractSeOperationService;
import com.kp.core.spring.admin.services.impl.AuthorizationService;
import com.kp.core.spring.admin.vo.ResponseMsg;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SeOperationController extends BaseControler<SeOperation, String, SeOperationRepository, AbstractSeOperationService> {
    @Autowired
    AuthorizationService authorizationService;
    @Autowired
    private RoleCache roleCache;

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seOperation/list", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.OPERATION + BaseOperations.KING, AppResources.OPERATION + BaseOperations.S}, logical = Logical.OR)

    public ResponseMsg getSeOperations(Pageable pageable) throws Exception {
        return findAll(pageable);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seOperation/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.OPERATION + BaseOperations.KING, AppResources.OPERATION + BaseOperations.S}, logical = Logical.OR)

    public ResponseMsg getDetailSeOperation(@PathVariable("id") java.lang.String id) throws Exception {
        return super.getById(id);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seOperation", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.OPERATION + BaseOperations.KING, AppResources.OPERATION + BaseOperations.I}, logical = Logical.OR)

    public ResponseMsg addSeOperation(@Valid @RequestBody SeOperation seOperation) {
        return create(seOperation);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seOperation/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.OPERATION + BaseOperations.KING, AppResources.OPERATION + BaseOperations.U}, logical = Logical.OR)

    public ResponseMsg updateSeOperation(@PathVariable("id") java.lang.String id, @Valid @RequestBody SeOperation seOperation) throws Exception {
        return super.update(id, seOperation);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seOperation/{id}", method = RequestMethod.DELETE, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.OPERATION + BaseOperations.KING, AppResources.OPERATION + BaseOperations.D}, logical = Logical.OR)

    public ResponseMsg deleteSeOperation(@PathVariable("id") java.lang.String id) {
        return super.delete(id);
    }

    @RequiresPermissions(value = {AppResources.OPERATION + BaseOperations.KING, AppResources.OPERATION + BaseOperations.U}, logical = Logical.OR)

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "seOperation/multiple/delete", method = RequestMethod.POST)
    public ResponseMsg deleteOperations(@RequestBody List<String> operations) throws AuthenticationException {

        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {

            authorizationService.excuteDeleteOperations(operations);

            response = ResponseMsg.newOKResponse();

        } catch (Exception e) {
            if (e instanceof DataIntegrityViolationException) {
                response = ResponseMsg.newResponse(ResultCode.OBJECT_HAS_RELATIONSHIPS);
            }
            getLogger().error("failed {} error", operations, e);
        } finally {
            roleCache.removeAll();
        }
        getLogger().info("done {}", response);
        return response;
    }

    @Override
    public void merge(SeOperation newBean, SeOperation currentBean) {
        currentBean.setName(newBean.getName());
        currentBean.setStatus(newBean.getStatus());
    }

    @Override
    public String getBeanName() {
        return "seOperation";
    }
} 